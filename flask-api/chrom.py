import math

from numpy import count_nonzero
import random

class Item_Base:
    def __init__(self, strength, dexterity, intelligence, red, blue, green, total):
        self.strength = strength
        self.dexterity = dexterity
        self.intelligence = intelligence
        self.red = red
        self.green = green
        self.blue = blue
        self.total = total

class Colored:
    def __init__(self, red, green, blue):
        self.red = red
        self.green = green
        self.blue = blue
    def __str__(self):
        return "({}, {}, {})".format(self.red, self.green, self.blue)
    def __repr__(self):
        return "({}, {}, {})".format(self.red, self.green, self.blue)
    def total(self):
        return (self.red + self.green + self.blue)

item = Item_Base(100,100,0,3,1,0,4)

def get_color_chances(item_base):
    x = 5
    c = 5
    max_chance = 0.9
    requirements = {'red':item_base.strength, 'green':item_base.dexterity, 'blue':item_base.intelligence}
    total_requirements = sum(requirements.values())
    number_of_requirements = count_nonzero([item_base.strength, item_base.intelligence, item_base.dexterity])
    def single(requirement, x=x, c=c, max_chance=max_chance, total_requirements=total_requirements, number_of_requirements=number_of_requirements):
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
    def double(requirement, x=x, c=c, max_chance=max_chance, total_requirements=total_requirements, number_of_requirements=number_of_requirements):
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
    def triple(requirement, x=x, c=c, max_chance=max_chance, total_requirements=total_requirements, number_of_requirements=number_of_requirements):
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

def get_probabilities(item_base):

    color_chances = get_color_chances(item_base)

def multinomial(color_chances, desired, free, pos = 1):
    if free > 0:
        num = (0 if pos > 1 else multinomial(color_chances, Colored(desired.red + 1, desired.green, desired.blue), free - 1, 1)) \
            + (0 if pos > 2 else multinomial(color_chances, Colored(desired.red, desired.green + 1, desired.blue), free - 1, 2)) \
            + multinomial(color_chances, Colored(desired.red, desired.green, desired.blue + 1), free - 1, 3)
        return (num)
    else:
        # oh i'm the genie
        return (
            math.factorial(desired.total()) / (math.factorial(desired.red) * math.factorial(desired.green) * math.factorial(desired.blue)) \
            * math.pow(color_chances.red, desired.red) * math.pow(color_chances.green, desired.green) * math.pow(color_chances.blue, desired.blue)
            )
