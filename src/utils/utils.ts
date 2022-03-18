import { apiGetCodeMstList, apiGetCodeDtl } from "@/apis/api/userRequest";
import { sysCodeMst, sysCodeDtl } from "@/apis/type";

export async function getCodeByMstName(mstName: string) {
    const codeMstArray: sysCodeMst[] = await getCodeMst(mstName);
    if (codeMstArray.length > 0) {
        return await getCodeDtl(codeMstArray[0].id as number);
    } else {
        return [];
    }
}

function getCodeMst(mstName: string) {
    return new Promise<sysCodeMst[]>((resolve, reject) => {
        apiGetCodeMstList()
            .then((response: any) => {
                const allMstArray: sysCodeMst[] = response.data;
                const selectedMst: sysCodeMst[] = allMstArray.filter((row) => row.name == mstName);
                resolve(selectedMst);
            })
            .catch(() => {
                reject([]);
            });
    });
}

function getCodeDtl(mstId: number) {
    return new Promise<sysCodeDtl[]>((resolve, reject) => {
        apiGetCodeDtl({ mstId: mstId })
            .then((response: any) => {
                resolve(response.data);
            })
            .catch(() => {
                reject([]);
            });
    });
}
