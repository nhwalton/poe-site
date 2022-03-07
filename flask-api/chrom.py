from cmath import inf
import math
from numpy import count_nonzero, clip
import random

class Item_Base:
    def __init__(self, strength, dexterity, intelligence, red, green, blue, total_sockets):
        self.strength = strength
        self.dexterity = dexterity
        self.intelligence = intelligence
        self.red = red
        self.green = green
        self.blue = blue
        self.total_sockets = total_sockets
        self.total_desired = self.red + self.green + self.blue
        self.free = self.total_sockets - self.total_desired
    # def total(self):
    #     return (self.red + self.green + self.blue)

class Colored:
    def __init__(self, red, green, blue):
        self.red = red
        self.green = green
        self.blue = blue
        self.total = self.red + self.green + self.blue
    def __str__(self):
        return "({}, {}, {})".format(self.red, self.green, self.blue)
    def __repr__(self):
        return "({}, {}, {})".format(self.red, self.green, self.blue)

class Probability:
    def __init__(self, recipe_name, chance, average_tries, recipe_cost, average_cost, std_dev):
        self.recipe_name = recipe_name
        self.chance = chance
        self.average_tries = average_tries
        self.recipe_cost = recipe_cost
        self.average_cost = average_cost
        self.std_dev = std_dev
    # def __iter__(self):
    #     yield 'recipe_name', self.recipe_name
    #     yield 'chance', self.chance
    #     yield 'average_tries', self.average_tries
    #     yield 'recipe_cost', self.recipe_cost
    #     yield 'average_cost', self.average_cost
    #     yield 'std_dev', self.std_dev

class Recipe(Colored):
    def __init__(self, red, green, blue, cost, description = None):
        super().__init__(red, green, blue)
        self.cost = cost
        if (description == None):
            self.description = "Craft " + (f"{red}R" if red >= 1 else "") + (f"{green}G" if green >= 1 else "") + (f"{blue}B" if blue >= 1 else "")
        else:
            self.description = description

item = Item_Base(100,100,0,3,1,0,4)

recipes = []

recipes.append(Recipe(0, 0, 0, 1, "Drop Rate"));
recipes.append(Recipe(0, 0, 0, 1, "Chromatic"));
recipes.append(Recipe(1, 0, 0, 4));
recipes.append(Recipe(0, 1, 0, 4));
recipes.append(Recipe(0, 0, 1, 4));
recipes.append(Recipe(2, 0, 0, 25));
recipes.append(Recipe(0, 2, 0, 25));
recipes.append(Recipe(0, 0, 2, 25));
recipes.append(Recipe(0, 1, 1, 15));
recipes.append(Recipe(1, 0, 1, 15));
recipes.append(Recipe(1, 1, 0, 15));
recipes.append(Recipe(3, 0, 0, 120));
recipes.append(Recipe(0, 3, 0, 120));
recipes.append(Recipe(0, 0, 3, 120));
recipes.append(Recipe(2, 1, 0, 100));
recipes.append(Recipe(2, 0, 1, 100));
recipes.append(Recipe(1, 2, 0, 100));
recipes.append(Recipe(0, 2, 1, 100));
recipes.append(Recipe(1, 0, 2, 100));
recipes.append(Recipe(0, 1, 2, 100));

def get_color_chances(item_base):
    x = 5
    c = 5
    max_chance = 0.9
    requirements = {'red':item_base.strength, 'green':item_base.dexterity, 'blue':item_base.intelligence}
    total_requirements = sum(requirements.values())
    try:
        number_of_requirements = count_nonzero([item_base.strength, item_base.intelligence, item_base.dexterity])
    except:
        number_of_requirements = 3
    def single(requirement, x=x, c=c, max_chance=max_chance, total_requirements=total_requirements):
        if requirement > 0:
            # The real meat.
            # The chance for rolling an on-color socket for a mono-requirement item is
            #    x + c + requirement
            #   --------------------- * maxOncolorchance
            #    3x + c + totalReqs
            # In other words, the on-color chance approaches maxOncolorchance as requirement approaches infinity.
            return max_chance * (x + c + requirement) / (total_requirements + 3 * x + c);
        else:
            # The off-color chance is the remaining chance divided by 2.
            return ((1 - max_chance) / 2) + max_chance * (x / (total_requirements + 3 * x + c));
    def double(requirement, max_chance=max_chance, total_requirements=total_requirements):
        if requirement > 0:
            # The real meat.
            # The chance for rolling an on-color socket for a mono-requirement item is
            #    x + c + requirement
            #   --------------------- * max_chance
            #    3x + c + totalReqs
            # In other words, the on-color chance approaches max_chance as requirement approaches infinity.
            return max_chance * requirement / total_requirements;
        else:
            # The off-color chance is the remaining chance divided by 2.
            return 1 - max_chance
    def triple(requirement, total_requirements=total_requirements):
        # For all current things that have equal requirements, it should be 1/3 chance per color.
        # There's no way to test how a 50 str/25 dex/100 int item behaves, so it's just, like, a guess.
        return requirement / total_requirements
    
    switcher = {1: single, 2: double, 3: triple}
    percent_requirements = {
        'red': switcher[number_of_requirements](requirements['red']),
        'green': switcher[number_of_requirements](requirements['green']),
        'blue': switcher[number_of_requirements](requirements['blue'])
    }
    return Colored(percent_requirements['red'], percent_requirements['green'], percent_requirements['blue'])

def chrom_simulation(color_chances, total_sockets):
    last_sockets = []
    sockets = Colored(0,0,0)
    total = []
    i = 0
    while i < 10000:
        sockets = Colored(0,0,0)
        j = 0
        current_sockets = ""
        while j < total_sockets:
            r = random.random()
            if r <= color_chances.red:
                current_sockets += 'R'
                sockets.red +=1 
            elif r <= color_chances.red + color_chances.green:
                current_sockets += 'G'
                sockets.green +=1 
            else:
                current_sockets += 'B'
                sockets.blue +=1
            j += 1
        
        if current_sockets == last_sockets:
            continue
        else:
            last_sockets = current_sockets
            total.append(sockets)
            i += 1
    return total

def get_probabilities(item_base, recipes):
    probs = []
    color_chances = get_color_chances(item_base)
    # chrom_simulation(color_chances, item_base.total_sockets)
    cheapest_cost = inf
    cheapest_recipe = None

    for recipe in recipes: 
        if recipe.red <= item_base.red and recipe.green <= item_base.green and recipe.blue <= item_base.blue:
            remaining_sockets = Colored(item_base.red - recipe.red, item_base.green - recipe.green, item_base.blue - recipe.blue)
            free_sockets = item_base.free

            chance = multinomial(color_chances, remaining_sockets, free_sockets)

            if recipe.description == "Chromatic":
                collision_chance = calc_chrom_bonus(color_chances, Colored(item_base.red, item_base.green, item_base.blue), item_base.total_sockets)
                chance /= 1 - collision_chance
            
            if (recipe.cost / chance) < cheapest_cost:
                cheapest_cost = recipe.cost / chance
                cheapest_recipe = recipe
            probs.append(
                Probability(
                    recipe_name = recipe.description,
                    chance = "{:.2f}%".format(chance * 100),
                    average_tries = "{:.0f}".format((1 / chance)),
                    recipe_cost = "-" if recipe.description == "Drop Rate" else (recipe.cost),
                    average_cost = "-" if recipe.description == "Drop Rate" else "{:,.0f}".format((recipe.cost / chance)),
                    std_dev = "{:.2f}".format(math.sqrt(clip((1 - chance), 0, 1) / (chance * chance))),
                )
            )

    for probability in probs:
        if probability.recipe_name == cheapest_recipe.description:
            probability.cheapest = True
            
    return(probs)

def multinomial(color_chances, desired, free, pos = 1):
    if free > 0:
        num = (0 if pos > 1 else multinomial(color_chances, Colored(desired.red + 1, desired.green, desired.blue), free - 1, 1)) \
            + (0 if pos > 2 else multinomial(color_chances, Colored(desired.red, desired.green + 1, desired.blue), free - 1, 2)) \
            + multinomial(color_chances, Colored(desired.red, desired.green, desired.blue + 1), free - 1, 3)
        return (num)
    else:
        # oh i'm the genie
        return (
            math.factorial(desired.total) / (math.factorial(desired.red) * math.factorial(desired.green) * math.factorial(desired.blue)) \
            * math.pow(color_chances.red, desired.red) * math.pow(color_chances.green, desired.green) * math.pow(color_chances.blue, desired.blue)
            )

def calc_chrom_bonus(color_chances, desired, total_sockets, rolled=None, pos = 1):
    if rolled == None:
        rolled = Colored(0,0,0)
    if rolled.red >= desired.red and rolled.green >= desired.green and rolled.blue >= desired.blue:
        return 0
    elif total_sockets > 0:
        value = (0 if pos > 1 else calc_chrom_bonus(color_chances, desired, total_sockets - 1, Colored(rolled.red + 1, rolled.green, rolled.blue), 1)) \
            + (0 if pos > 2 else calc_chrom_bonus(color_chances, desired, total_sockets - 1, Colored(rolled.red, rolled.green + 1, rolled.blue), 2)) \
            + calc_chrom_bonus(color_chances, desired, total_sockets - 1, Colored(rolled.red, rolled.green, rolled.blue + 1), 3)
        return(
            value
        )
    else:
        return(
            math.factorial(rolled.total) / (math.factorial(rolled.red) * math.factorial(rolled.green) * math.factorial(rolled.blue)) \
            * math.pow(color_chances.red, rolled.red * 2) * math.pow(color_chances.green, rolled.green * 2) * math.pow(color_chances.blue, rolled.blue * 2)
            )

def calculate(strength, dexterity, intelligence, red, green, blue, total_sockets, recipes = recipes):
    constraints = Item_Base(strength, dexterity, intelligence, red, green, blue, total_sockets)
    recipe_outputs = get_probabilities(constraints, recipes)
    arr = []
    for recipe in recipe_outputs:
        arr.append(recipe.__dict__)
    return(arr)

if __name__ == "__main__":
    print("This is a meant to be run as a function, not a script.")