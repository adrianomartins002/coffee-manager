// import api from "../api";
import * as _ from "lodash";
import axios from 'axios';

export const CoffeeService = {
  getCoffees: async (typeOfCoffees) => {
    if (typeOfCoffees == null) {
      throw new Error("Parametro invalido para busca de cafés");
    }

    try {

      console.log("veio")
      const { data } = await axios({
        timeout: 5000,
        method: 'get',
        url: `https://api.sampleapis.com/coffee/${typeOfCoffees}`
      })

      return {
        status: true,
        data,
      };
    } catch (response) {
      let data = null;
      if (typeOfCoffees === "hot")
        data = listOfCoffeesHot;
      else
        data = listOfCoffeesIced;

      return {
        status: true,
        data,
      };
    }
  },
  createCoffee: (title, type, coffeesData) => {
    if (!title || !type || !coffeesData)
      throw new Error("Parametros invalidos para criação de novo café.");

    let newCoffee = {
      id: Math.random(),
      title
    };

    return {
      ...coffeesData,
      [type]: [...coffeesData[type], newCoffee]
    }

  },
  updateCoffee: (id, title, type, coffeesData) => {
    if (!id || !title || !type || !coffeesData)
      throw new Error("Parametros invalidos para atualização café.");

    return {
      ...coffeesData,
      [type]: _.map(coffeesData[type], function (currentObject) {
        if (currentObject.id === id) {
          return currentObject = {
            ...currentObject,
            title: title
          }
        } else {
          return currentObject;
        }
      })
    };
  },
  deleteCoffeeOfTheList: (id, type, coffeesData) => {
    if (!id || !type || !coffeesData)
      throw new Error("Parametros invalidos para deletar café.");

    return {
      ...coffeesData,
      [type]: _.filter(coffeesData[type], function (currentObject) {
        return currentObject.id !== id;
      })
    };

  },
}


const listOfCoffeesIced = [
  {
    id: 1,
    title: "Cold Simple",
  },
  {
    id: 2,
    title: "Cold Cappuccino",
  },
  {
    id: 3,
    title: "Cold Frappuccino",
  },
]


const listOfCoffeesHot = [
  {
    id: 4,
    title: "Express",
  },
  {
    id: 5,
    title: "Extra strong",
  },
  {
    id: 6,
    title: "Irish coffee",
  },
]