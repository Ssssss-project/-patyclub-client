import { apiGetCodeDtl } from "@/apis/api/userRequest";
import { sysCodeDtl } from "@/apis/type";

export async function getCodeByKeyword(mstName: string) {
    return await getCodeDtl(mstName);
}

function getCodeDtl(sysCodeMstKeyword: string) {
    return new Promise<sysCodeDtl[]>((resolve, reject) => {
        apiGetCodeDtl({ mstKeyword: sysCodeMstKeyword })
            .then((response: any) => {
                resolve(response.data);
            })
            .catch(() => {
                reject([]);
            });
    });
}
