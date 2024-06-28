import { ref, set, get, update } from "firebase/database";
import { database } from "../firebase";

const fetch = async (url) => {
    const data = await get(ref(database, url))
        if(data.exists()){
            const unitsArr = data.val()
            return unitsArr
        } else {
            return []
        }
}

const pagesService = {
    getUnitsForMeasurementPage: async () => {
        const data = await fetch(`pages/measurements/units`)
        return data
    },
    getIconsForHabitsPage:async() => {
        const data = await fetch(`pages/habits/icons`)
        return data
    },
    getUnitsForHabitsPage:async() => {
        const data = await fetch(`pages/habits/units`)
        return data
    }
};

export default pagesService;
