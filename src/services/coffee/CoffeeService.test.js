import { CoffeeService } from "."


describe("CoffeeService", ()=>{
    describe("Recuperar dados de cafés", ()=>{
        test("Se passar todos os parametros corretamente", async ()=>{
           
            const response = await CoffeeService.getCoffees("hot");

            expect(response.data).toBeDefined();
            expect(response.data.length>0).toBe(true)
        }),
        test("Se não passar os parametros receber um erro", async()=>{
            
            await expect(CoffeeService.getCoffees(null)).rejects.toThrow("Parametro invalido para busca de cafés")
        })
    })

    describe("createCoffee",()=>{
        test("Criar novo café passando parametros validos",()=>{
           const coffeeDataList = CoffeeService.createCoffee("capuccino", "hot", {hot:[{}]});
           expect(coffeeDataList).toBeDefined();
           expect(coffeeDataList.hot.filter(item=> item.title === "capuccino")[0].title).toBe("capuccino");

        }),
        test("Criar novo café passando parametros inválidos",()=>{
            expect(()=>CoffeeService.createCoffee(null, null, {hot:[{}]})).toThrow("Parametros invalidos para criação de novo café.");
        })
    })

    describe("UpdateCoffee",()=>{
        test("Atualizar café existente",()=>{
            const coffeeDataList = CoffeeService.updateCoffee(1, "capuccino", "hot", {hot:[{id: 1, title: "teste"}]});
           expect(coffeeDataList).toBeDefined();
           expect(coffeeDataList.hot.filter(item=> item.title === "capuccino")[0].title).toBe("capuccino");
        }),
        test("Atualizar novo café passando parametros inválidos",()=>{
            expect(()=>CoffeeService.updateCoffee(null, null, {hot:[{}]})).toThrow("Parametros invalidos para atualização café.");
        })
    })

    describe("DeleteCoffee", ()=>{
        test("Deletar café existente",()=>{
            const coffeeDataList = CoffeeService.deleteCoffeeOfTheList(1, "hot", {hot:[{id: 1, title: "teste"}]});
           expect(coffeeDataList).toBeDefined();
           
        }),
        test("Deletar café passando parametros inválidos",()=>{
            expect(()=>CoffeeService.deleteCoffeeOfTheList(null, null, {hot:[{}]})).toThrow("Parametros invalidos para deletar café.");
        })
    })
})


