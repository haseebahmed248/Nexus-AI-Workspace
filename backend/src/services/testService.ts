import { prisma } from "@/lib/prisma";


export class TestService {
    async updateCounter(){
        console.log('updating.....')
        const data:any = await prisma.$queryRaw`SELECT * FROM test`
            console.log(`Query Data: `, data);
            const data_upd = await prisma.test.update({
                where:{
                  id : 1 
                },
                data:{
                    counter: data[0].counter+1
                }
            })
            console.log("Updated data ", data_upd)
        return data;
    }
}