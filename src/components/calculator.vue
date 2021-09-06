<template>
  <div class="flexbox">
    <div class="calculator">
      <input class="display" v-model="current"/>
      <div class="btn dark" @click="clear()">C</div>
      <div class="btn dark">+/-</div>
      <div class="btn dark">%</div>
      <div class="btn operator" @click="plus4()">/</div>
      <div class="btn" @click="append('7')">7</div>
      <div class="btn" @click="append('8')">8</div>
      <div class="btn" @click="append('9')">9</div>
      <div class="btn operator" @click="plus3()">x</div>
      <div class="btn" @click="append('4')">4</div>
      <div class="btn" @click="append('5')">5</div>
      <div class="btn" @click="append('6')">6</div>
      <div class="btn operator" @click="plus2()">-</div>
      <div class="btn" @click="append('1')">1</div>
      <div class="btn" @click="append('2')">2</div>
      <div class="btn" @click="append('3')">3</div>
      <div class="btn operator" @click="plus()">+</div>
      <div class="btn zero" @click="append('0')">0</div>
      <div class="btn" >.</div>
      <div class="btn operator" @click="eaqul()">=</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      current: "",
      previous: "",
      operator: null,
      operatorClicked: false
    };
  },
  methods:{
   append(number) {
     if (this.operatorClicked) this.current = "";
     this.operatorClicked = false
     this.current = this.current === "0" ? `${number}` : `${this.current}${number}`;
   },
   clear() {
    this.current = ""
   },
   setPrevious() {
    this.previous = this.current;
    this.operatorClicked = true;
   },
   plus() {
     this.operator = (a,b) => a + b ;
     this.setPrevious();
   },
   plus2() {
     this.operator = (a,b) => a - b ;
     this.setPrevious();
   },
   plus3() {
     this.operator = (a,b) => a * b ;
     this.setPrevious();
   },
   plus4() {
     this.operator = (a,b) => a / b ;
     this.setPrevious();
   },
   eaqul() {
     console.log(`${this.previous} ${this.current}`);
    this.current = `${this.operator(parseFloat(this.previous),parseFloat(this.current))}`;
    this.operator = null;
    this.operatorClicked = false;
   }
  }
};
</script>

<style>  
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}  
  
.flexbox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
  
.calculator {
  display: grid;
  width: 300px;
  margin: 0 auto;
  font-size: 40px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
  border: .3px solid #868383;
  border-radius: 3rem;
  padding: .8em;
  background-color: #222;
}
  
.display {
  grid-column: 1/5;
  background-color: lightblue;
  text-align: right;
  padding-right: 20px;
  background-color: #D3D3D3;
  color: #333;
  margin-bottom: 10px;
  border-radius: 16px;
  outline: 0;
  font-size: 36px;
}
  
.btn {
  border: 1px solid black;
  background-color: #999;
  cursor: pointer;
  border-radius: 40px;
  margin: 10px;
  color: #222;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.2s ease-in;
}
  
.btn:hover {
 background-color: #868383;   
}
.dark {
  background-color: #333;
  color: #ffffff;
}
.operator {
  background-color: #e08d1f;
}
.zero {
  grid-column: 1/3;
}
</style>