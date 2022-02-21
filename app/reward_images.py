import requests
import os

# get relative directory
dir_path = os.path.dirname(os.path.realpath(__file__))
print(dir_path)

images = [
{"title":"toxic","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillPoison.png?locale=1&amp;scale=2"},
{"title":"chaosweaver","use":"use","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillVoidtouched.png?locale=1&amp;scale=2"},
{"title":"frostweaver","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillFrosttouched.png?locale=1&amp;scale=2"},
{"title":"permafrost","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillFreezer.png?locale=1&amp;scale=2"},
{"title":"hasted","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillSpeed.png?locale=1&amp;scale=2"},
{"title":"deadeye","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillDeadeye.png?locale=1&amp;scale=2"},
{"title":"bombardier","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillBombardier.png?locale=1&amp;scale=2"},
{"title":"flameweaver","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillFlametouched.png?locale=1&amp;scale=2"},
{"title":"incendiary","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillFire.png?locale=1&amp;scale=2"},
{"title":"arcane-buffer","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillEnergyShield.png?locale=1&amp;scale=2"},
{"title":"echoist","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillCaster.png?locale=1&amp;scale=2"},
{"title":"stormweaver","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillStormtouched.png?locale=1&amp;scale=2"},
{"title":"dynamo","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillShocker.png?locale=1&amp;scale=2"},
{"title":"bonebreaker","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillBonebreaker.png?locale=1&amp;scale=2"},
{"title":"bloodletter","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillBloodletter.png?locale=1&amp;scale=2"},
{"title":"steel-infused","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillSteelattuned.png?locale=1&amp;scale=2"},
{"title":"gargantuan","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillGargantuan.png?locale=1&amp;scale=2"},
{"title":"berserker","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillRage.png?locale=1&amp;scale=2"},
{"title":"sentinel","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillDefender.png?locale=1&amp;scale=2"},
{"title":"juggernaut","use":"use","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillJuggernaut.png?locale=1&amp;scale=2"},
{"title":"vampiric","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillVampiric.png?locale=1&amp;scale=2"},
{"title":"overcharged","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillChargegenerator.png?locale=1&amp;scale=2"},
{"title":"soul-conduit","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillSoulconduit.png?locale=1&amp;scale=2"},
{"title":"opulent","use":"use","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillWealthy.png?locale=1&amp;scale=2"},
{"title":"malediction","use":"use","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillOppressor.png?locale=1&amp;scale=2"},
{"title":"consecrator","use":"use","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillConsecration.png?locale=1&amp;scale=2"},
{"title":"frenzied","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRareKillRampage.png?locale=1&amp;scale=2"},
{"title":"heralding-minions","use":"use","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeHeraldoftheobelisk.png?locale=1&amp;scale=2"},
{"title":"empowering-minions","use":"use","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeUnionofsouls.png?locale=1&amp;scale=2"},
{"title":"assassin","use":"combo","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeNecromancer.png?locale=1&amp;scale=2"},
{"title":"trickster","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeExecutioner.png?locale=1&amp;scale=2"},
{"title":"necromancer","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeAssassin.png?locale=1&amp;scale=2"},
{"title":"rejuvenating","use":"combo","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeTrickster.png?locale=1&amp;scale=2"},
{"title":"executioner","use":"combo","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeRejuvenating.png?locale=1&amp;scale=2"},
{"title":"hexer","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeHexer.png?locale=1&amp;scale=2"},
{"title":"drought-bringer","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeFlaskdrain.png?locale=1&amp;scale=2"},
{"title":"entangler","use":"use","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeGraspingVines.png?locale=1&amp;scale=2"},
{"title":"temporal-bubble","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeTimeBubble.png?locale=1&amp;scale=2"},
{"title":"treant-hoard","use":"combo","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeSaplings.png?locale=1&amp;scale=2"},
{"title":"frost-strider","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeFrostwalker.png?locale=1&amp;scale=2"},
{"title":"ice-prison","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeCold.png?locale=1&amp;scale=2"},
{"title":"soul-eater","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeSouleater.png?locale=1&amp;scale=2"},
{"title":"flame-strider","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeFire.png?locale=1&amp;scale=2"},
{"title":"corpse-detonator","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeCorpseeploder.png?locale=1&amp;scale=2"},
{"title":"evocationist","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipePrismatic.png?locale=1&amp;scale=2"},
{"title":"magma-barrier","use":"combo","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeVolatileflameblood.png?locale=1&amp;scale=2"},
{"title":"mirror-image","use":"combo","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeMirrorImage.png?locale=1&amp;scale=2"},
{"title":"storm-strider","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeLightningwalker.png?locale=1&amp;scale=2"},
{"title":"mana-siphoner","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeManaDonut.png?locale=1&amp;scale=2"},
{"title":"corrupter","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeCorrupter.png?locale=1&amp;scale=2"},
{"title":"invulnerable","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeDivinetouched.png?locale=1&amp;scale=2"},
{"title":"crystal-skinned","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeLivingCrystal.png?locale=1&amp;scale=2"},
{"title":"empowered-elements","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeCycleofelements.png?locale=1&amp;scale=2"},
{"title":"effigy","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModRecipeVoodoodoll.png?locale=1&amp;scale=2"},
{"title":"lunaris-touched","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModPantheonLunaris.png?locale=1&amp;scale=2"},
{"title":"solaris-touched","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModPantheonSolaris.png?locale=1&amp;scale=2"},
{"title":"arakaali-touched","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModPantheonArakaali.png?locale=1&amp;scale=2"},
{"title":"brine-king-touched","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModPantheonBrineking.png?locale=1&amp;scale=2"},
{"title":"tukohama-touched","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModPantheonTukohama.png?locale=1&amp;scale=2"},
{"title":"abberath-touched","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModPantheonAbberath.png?locale=1&amp;scale=2"},
{"title":"shakari-touched","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModPantheonShakari.png?locale=1&amp;scale=2"},
{"title":"innocence-touched","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModPantheonInnocence.png?locale=1&amp;scale=2"},
{"title":"kitava-touched","image":"https://web.poecdn.com/image/Art/2DItems/Currency/Archnemesis/ModPantheonKitava.png?locale=1&amp;scale=2"}
]

for image in images:
    title = image['title']
    url = image['image']
    r = requests.get(url)
    try:
        with open(dir_path + '/public/images/' + title + '.png', 'xb') as f:
            f.write(r.content)
        print(title + ' saved')
    except:
        print(title + ' exists')
        pass

print('done')
