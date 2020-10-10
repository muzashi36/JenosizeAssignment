'use strict'

const Axios = require('axios')

const judgePoint24 = function(nums) {
    nums = nums.map(num => Number(num.toFixed(4)))

    const computeTwoNums = (num1, num2) => {
        return [num1 + num2, num1 - num2, num2 - num1, num1 * num2, num1/num2, num2/num1]
    };
    
    const dfs = (list) => {
        let size = list.length
        if(size === 1) {
            if(Math.abs(list[0] - 24) < 0.001) return true
            else return false
        }
        
        for(let i = 0; i < size; i++) {
            for(let j = i + 1; j < size; j++) {
                let nextRound = []
                for(let k = 0; k < size; k++) {
                    if(k !== i && k !== j) nextRound.push(list[k])
                }
                for(let val of computeTwoNums(list[i], list[j])) {
                    nextRound.push(val)
                    if(dfs(nextRound)) return true
                    else nextRound.pop()
                }
            }
        }
        return false
    };
    
    return dfs(nums)
};

let judgePoint24Handler = async (r, h) => {
    let numbers = r.payload.numbers

    return judgePoint24(numbers)
}

let searchRestaurant = async (r, h) => {
    let input = r.payload.input
    let apiKey = process.env.GOOGLE_API_KEY

    let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${apiKey}&input=${input}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry`
    try {
        let response = await Axios.get(encodeURI(url))
        return response.data
    } catch(err) {
        return err
    }
}

module.exports = {
    judgePoint24Handler,
    searchRestaurant
}