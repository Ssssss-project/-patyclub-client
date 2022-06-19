<template>
  <main id="SystemCodeView">
    <div class="container">
      <div class="control">
        <q-btn class="add" @click="addRow()">新增</q-btn>
        <q-btn class="save" @click="updateCodeDtl()">SAVE</q-btn>
        <q-input :dense="true" class="search" outlined >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="main">
        <div>
          <q-card v-for="(data, idx) in codeMst" :key="idx"
                  v-ripple
                  class="cardMst my-box cursor-pointer q-hoverable" 
                  :class="{cardMstClick: isActive[idx]}"
                  @click="cardClick(idx, data.keyword)">
            <span class="q-focus-helper"></span>
            <q-card-section>
              <span class="cardKeyword" select>{{ data.keyword }}</span> <br>
              <span class="cardName">{{ data.name }}</span>
            </q-card-section>
          </q-card>
        </div>
        <div class="dtlDiv">
          <draggable
            v-if="list.length > 0"
            :list="list"
            :disabled="!enabled"
            item-key="orderSeq"
            ghost-class="ghost"
            handle=".drag_icon">
            <template v-slot:item="{ element }">
              <div class="list-group-item" :class="{ 'not-draggable': !enabled , 'addRow': element.rowStatus == 'C' ? true : false}">
                <q-icon name="format_align_justify" size="25px" class="drag_icon"/>
                <q-input v-model="element.codeName" :dense="true" class="codeName" :readonly="element.editable" @update:model-value="rowChange(element.id, 'U')"/>
                <q-input v-model="element.codeDesc" :dense="true" class="codeDesc" :readonly="element.editable" @update:model-value="rowChange(element.id, 'U')"/>
                <q-btn icon="delete" class="delete-btn" flat @click="removeCodeDtl(element.id, element.sysCodeMstKeyword)"/>
                <q-btn icon="edit" class="edit-btn" @click="element.editable = false" flat/>
                <div class="line"/>
                <q-toggle v-model="element.enable" color="green" class="rightStyle" @update:model-value="rowChange(element.id, 'U')"/>
              </div>
            </template>
          </draggable>
          <div v-else class="noData">
            查無資料
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { onMounted, reactive } from "vue";
import { apiGetCodeMstList, apiGetCodeDtl, apiUpdateCodeDtl, apiRemoveCodeDtl, apiAddCodeDtl } from "../apis/api/userRequest";
import { sysCodeMst } from "../apis/type";
import draggable from 'vuedraggable';
export default {
  setup() {
    const codeMst:sysCodeMst[] = reactive([]);
    const isActive:Array<boolean> = reactive([]);
    const list:Array<any> = reactive([]);

    onMounted(() => {
      getCodeMst();
    });

    function getCodeMst() {
      apiGetCodeMstList().then((response:any) => {
        response.data.forEach((object: any, index:number) => {
          codeMst.push(object);
          if (index == 0){
            isActive.push(true);
            updateMstKeyword = object.keyword;
            getCodeDtl(object.keyword);
          } else {
            isActive.push(false);
          }
        });
      });
    }

    function getCodeDtl(mstKeyword:string) {
      while(list.length > 0) {
        list.pop();
      }
      apiGetCodeDtl({mstKeyword:mstKeyword}).then((response:any) => {
        response.data.forEach((dtl: any) => {
          list.push({id:dtl.id, 
                    sysCodeMstKeyword:dtl.sysCodeMstKeyword,
                    codeName:dtl.codeName, 
                    codeDesc:dtl.codeDesc,
                    orderSeq:dtl.orderSeq, 
                    enable:true, 
                    editable:true,
                    rowStatus:"R"});
        });
      });
    }

    function cardClick(idx:any, mstKeyword:string){
      for(let i = 0;i < isActive.length;i++) {
        isActive[i] = i == idx ? true : false;
      }
      updateMstKeyword = mstKeyword;
      getCodeDtl(mstKeyword);
    }

    function moveEnd(e:any) {
      let oldIndex = (parseInt(e.oldIndex) + 1);
      let newIndex = (parseInt(e.newIndex) + 1);
      for(let i = 0 ; i < list.length ; i++) {
        if(list[i].orderSeq == oldIndex || list[i].orderSeq == newIndex) {
          list[i].rowStatus = "U";
        }
        if(list[i].orderSeq != i + 1) {
          list[i].orderSeq = i + 1;
        }
      }
    }

    function rowChange(id:number, rowStatus:string) {
      for(let i = 0 ; i < list.length ; i++) {
        if(list[i].id == id && list[i].rowStatus != "C") {
          list[i].rowStatus = rowStatus;
          break;
        }
      }
    }

    let updateMstKeyword:string = "";
    function updateCodeDtl(){
      apiUpdate().then(()=>{
        getCodeDtl(updateMstKeyword);
      })
    }

    async function apiUpdate() {
        for(let i = 0 ; i < list.length ; i++) {
          if (list[i].orderSeq != i + 1) {
            list[i].rowStatus = "U";
            list[i].orderSeq = i + 1;
          }

          if(list[i].rowStatus == "U") {
            updateMstKeyword = list[i].sysCodeMstKeyword;
            await apiUpdateCodeDtl(list[i]);
          } else if (list[i].rowStatus == "C") {
            await apiAddCodeDtl(list[i]);
          }
        }
    }

    function removeCodeDtl(dtlId:any, mstKeyword:string) {
      apiRemoveCodeDtl({sysCodeDtlId:dtlId}).then(()=>{
         getCodeDtl(mstKeyword);
      })
    }

    function addRow() {
      list.push({id:0, 
                  sysCodeMstKeyword:updateMstKeyword,
                  codeName:"", 
                  codeDesc:"",
                  orderSeq:list.length + 1, 
                  enable:true, 
                  editable:false,
                  rowStatus:"C"})
    }

    return {
      codeMst,
      isActive,
      getCodeMst,
      getCodeDtl,
      cardClick,
      moveEnd,
      rowChange,
      apiUpdate,
      updateCodeDtl,
      removeCodeDtl,
      addRow,
      enabled: true,
      list,
    }
  },

  components: {
    draggable
  },
};
</script>
