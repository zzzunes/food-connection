export default class HealthScoreCalculator {
    static createDiet(user) {
        const diet = {
            total: 0,
            fat: 0,
            protein: 0,
            carbohydrates: 0,
        };
        const age = user.age;
        const physicalActivityCoefficient = 1.0;
        switch (user.activityLevel) {
            case "sedentary":
                physicalActivityCoefficient = 1.0;
                break;
            case "low":
                physicalActivityCoefficient = 1.12;
                break;
            case "medium":
                physicalActivityCoefficient = 1.27;
                break;
            case "high":
                physicalActivityCoefficient = 1.45;
                break;
        }
        const weight = user.weight * 0.4535924; /* Pounds to kilos */
        const height = user.height * 0.0254; /* Inches to meters */
        diet.total = 354.1 - (6.91 * age) + physicalActivityCoefficient * (9.36 * weight + 726 * height);
        diet.carbohydrates = diet.total * .55;
        diet.protein = diet.total * .15;
        diet.fat = diet.total * .30;
        return diet;
    }
    static setHealthScore(foods, diet) {
        foods.forEach((food) => {
            food.healthScore = 0;
            if (food.addedSugar) {
                food.healthScore -= 20;
            }
            food.healthScore += food.fiber * 2;
            const carbRatio = food.carbs / diet.carbohydrates;
            const proteinRatio = food.protein / diet.protein;
            const fatRatio = food.fat / diet.fat;
            const carbDistance = Math.abs(1 - carbRatio);
            const proteinDistance = Math.abs(1 - proteinRatio);
            const fatDistance = Math.abs(1 - fatRatio);
            food.healthScore += carbDistance * 30;
            food.healthScore += proteinDistance * 20;
            food.healthScore += fatDistance * 20;
        });

        foods.sort((a, b) => {
            return b.healthScore - a.healthScore;
        });
        return foods;
    }
}