module.exports = {

    getGradeFromRoman(roman){
        let grade = 0
        const romans = { "I": 1, "V": 5, "X": 10 }
        const letters = roman.split('')
        for(let i=0; i < letters.length; i++){
            if(letters[i] < letters[i+1]){
                grade -= romans[letters[i]]
            }else{
                grade += romans[letters[i]]
            }
        }
        return grade
    },

    prepareName(string){
        let names = string.toLowerCase().split(" ")
        let result = "".trim()
        for(let name of names){
            let nameArr = name.split("")
            let newN = ""
            nameArr[0] = nameArr[0].toUpperCase()
            for(const letter of nameArr) newN += letter
            result += newN+" "
        }
        return result
    }
}