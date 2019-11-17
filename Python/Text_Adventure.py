#############################
#
# Jeremiah Snow
# Week 7 Programming Assignment
# CSC 110 Winter 2019
# jeremiah.snow@seattlecolleges.edu
#

#
# TEXT ADVENTURE is a choice based game
# There are multiple endings and rewards
#

import random
import time

# Configure Main
def main():
    
    # Intro, tutorial
    print("\n\nWelcome to the TEXT ADVENTURE(TM)!")
    print("A heroic story in a land both far and before our own.")
    print("\nWould you like to view the tutorial?")
    tutorial = str.upper(input("Type YES or NO: "))
    # Easter egg
    tut_count = 0
    bookworm = False
    while(tutorial != "NO" and tut_count < 2):
        if(tutorial == "YES"):
            print("\nVery well!")
            print("TEXT ADVENTURE(TM) is built upon CHANCE and CHOICE.")
            print("Some CHOICES will affect your CHANCES later on.")
            print("You may encounter COMPANIONS which will aid you along the way.")
            print("These COMPANIONS can alter CHANCES, too.")
            print("The CHOICES they affect will be marked!")
            print("They are also mortal beings, and can leave your journey if you neglect them.")
            tut_count += 1
            tutorial = str.upper(input("\nWould you like hear this again? YES or NO: "))
        else:
            print("\nInvalid input! You must type properly here.")
            tutorial = str.upper(input("Would you like to view the tutorial? YES or NO: "))

            
    # Player creation
    # Numbers are allowed here, it doesn't matter.
    player = str.capitalize(input("\nPlease tell us your name: "))
    while(len(player) > 12):
        print("Too long of a name!")
        player = str.capitalize(input("\nPlease tell us your name: "))
    sign = str.capitalize(input("Please tell us your star sign: "))
    while(len(sign) > 10):
        print("Too long for a sign!")
        sign = str.capitalize(input("\nPlease tell us your star sign: "))
                
    # Stats configuration
    print("\nYou must design your character's stats.")
    print("They are: STRENGTH, INTELLIGENCE, LUCK.")
    print("Pick them in order from most to least important.")
    print("You only get one chance at this, so choose wisely!")
    print("\nHow much do you value STRENGTH?")
    print("Choose 1, 2, or 3.")
    strength = gen_choice(3)
    print("\nHow much do you value INTELLIGENCE?")
    # I did this in a very un-elegant fashion
    # Would like to improve
    if(strength == 3):
        print("Choose 1 or 2.")
        choice = gen_choice(2)
        if(choice == 2):
            intel = 2
            luck = 1
        # So if you try to cheat, it assumes you're stupid
        else:
            intel = 1
            luck = 2
    elif(strength == 2):
        print("Choose 1 or 3.")
        # I'd like to remove the extra choice here somehow
        choice = gen_choice(3)
        if(choice == 3):
            intel = 3
            luck = 1
        else:
            intel = 1
            luck = 3
    else:
        print("Choose 2 or 3.")
        choice = gen_choice(3)
        if (choice == 3):
            intel = 3
            luck = 2
        else:
            intel = 2
            luck = 3        
    print("Your LUCK will be set to ", luck, ".", sep="")


    # Verify username and details
    print("\nYou have entered the following:\nName:", player, "\nStar sign:", sign)
    print("\nYour stats are:")
    print("Strength:", strength)
    print("Intelligence:", intel)
    print("Luck:", luck)
    # Get a rough, joking distinction of the player
    if(strength == 3 and intel == 1):
        design = "Brute"
    elif(strength == 3 and luck == 1):
        design = "Clumsy"
    elif(intel == 3 and strength == 1):
        design = "Dweeb"
    elif(intel == 3 and luck == 1):
        design = "Poet"
    elif(luck == 3 and intel == 1):
        design = "Forrest"
    else:
        design = "Balanced"
    print("Character design:", design)
    # Check (for name and sign only at this point)
    check = str.upper(input("\nIs this correct? Type YES or NO: "))
    # Easter egg
    idiot = False
    while(check != "YES"):
        if(check == "NO"):
            print("\nFine, enter your details again.")
            player = str.capitalize(input("Please tell us your name: "))
            while(len(player) > 12):
                print("Too long of a name!")
                player = str.capitalize(input("\nPlease tell us your name: "))
            sign = str.capitalize(input("Please tell us your star sign: "))
            while(len(sign) > 10):
                print("Too long for a sign!")
                sign = str.capitalize(input("\nPlease tell us your star sign: "))
            print("\nYou have entered the following:\nName:", player, "\nStar sign:", sign)
            check = str.upper(input("Is this correct? Type YES or NO: "))
        else:
            print("\nErr, what? That's not correct input.")
            print("\nYou have entered the following:\nName:", player, "\nStar sign:", sign)
            check = str.upper(input("Is this correct? Type YES or NO Only: "))
            if(check == "NO ONLY"):
                # You must enter bad data THEN reply "no only"
                idiot = True
                check = "YES"


    # Initial settings
    caught = False
    godfrey = True
    elyse = False
    chapter = 0
    if (tut_count == 2):
        bookworm = True
        player = "Bookworm"
        intel = 3
        print("\nYou perused the manual! Your name and stats have been changed.")        
    elif(idiot == True and bookworm != True):
        player = "Smartass"
        sign = "Uranus"
        print("\nYou're obnoxious! Your name and luck rolls have been changed.")
    elif(idiot == True and bookworm == True):
        player = "Neo"
        intel = 3
        sign = "Uranus"
        print("\nYou've broken the game! Your name and luck rolls have been changed.")
    else:
        print("\nGreetings, ", player, ".", sep="")



######################################
#
# Chapter index: Used as the GOTO
#
# format is:
# header()
# result from questdata()
# if choiceX GOTO questY
#
        
    # Act one options. Get caught, get confronted
    chapter = gen_header(chapter)
    result1 = act_one(player, sign, luck, intel)
    if(result1 == 1):
        print("\nPhew! You have successfully hid, free of any danger.")
        print("The guard walks by without noticing you.")
        chapter = gen_header(chapter)
        # GOTO ACT 2
        result2 = act_two(player, intel)
    else:
        print("\nOh no! You've been spotted!")
        print("The guards come in and apprehend you.")
        gen_header(chapter)
        caught = True
        result2 = "Skipped"
        # GOTO ACT 3
        result3 = act_three(player, sign, luck, intel)

    # Act two. Get caught, get confronted.
    if(result2 == 1):
        print("\nThough more treacherous, the long road home proved safe.")
        print("You made it to a safehouse.")
        result3 = "Skipped"
        chapter = gen_header(chapter)
        result4 = act_four(player, caught, godfrey, intel)
    elif(result2 == 2):
        print("\nOh no! Guards were alerted to the area after your heist.")
        print("You were apprehended on the way to his house!")
        chapter = gen_header(chapter)
        caught = True
        result3 = act_three(player, sign, luck, intel)
    else:
        result2 = "Skipped"

    # Act three options. Godfrey can die here. You can too.
    if(result3 == 1):
        print("\nSometimes, you have to know when to play dead.")
        print("You make it out alive.")
        chapter = gen_header(chapter)
        result4 = act_four(player, caught, godfrey, intel)
    elif(result3 == 2):
        print("\nYou jump to your feet and make a run for it! The crowd gasps in shock.")
        print("You are free, but a glance behind shows that Godfrey didn't have the same plan.")
        godfrey = False
        chapter = gen_header(chapter)
        result4 = act_four(player, caught, godfrey, intel)
    elif(result3 == 3):
        print("\nThe King scoffs at your insolence.")
        print("The crowd jeering, the guards move in on to apprehend you.")
        godfrey = False
        end(5, player, sign, caught, godfrey, elyse, luck, intel)
    else:
        result3 = "Skipped"

    # Act four options. If Godfrey is alive, he won't let you say no.
    if(result4 == 1):
        print("\nElyse seems to be telling the truth.")
        print("She chooses to assist you in your journey.")
        elyse = True
        chapter = gen_header(chapter)
        result5 = act_five(caught, sign, godfrey, elyse, luck, intel)
    elif(result4 == 2):
        print("\nIf she turned on them, she could turn on us.")
        print("You rejected the help of Elyse.")
        elyse = False
        chapter = gen_header(chapter)
        result5 = act_five(caught, sign, godfrey, elyse, luck, intel)
    elif(result4 == 3):
        if(intel > 1):
            print("\nGODFREY: \"There's no way I'm going to let you pass up this opportunity, ", player, "!", sep="")
            print("GODFREY: \"We're doing this together.\"")
        else:
            print("\nGODFREY: \"Don be dfjiosjf dksla so ijfioew, ", player, "!", sep="")
            print("GODFREY: \"Sabfjieow iouoieur opiopi dffeq uop.\"")
        print("Reluctantly, you join Elyse in her quest.")
        elyse = True
        chapter = gen_header(chapter)
        result5 = act_five(caught, sign, godfrey, elyse, luck, intel)
    else:
        print("\nI didn't want anything to do with this mess.")
        print("Only a fool would interfere with the Kingdom's own decline.")
        elyse = False
        end(4, player, sign, caught, godfrey, elyse, luck, intel)

    # Act five options. If Elyse exists, the door is unlocked.
    if(result5 == 1):
        print("You throw a rope to the window.")
        print("Let's hope no one hears your approach!")
        chapter = gen_header(chapter)
        result6 = act_six(player, sign, caught, godfrey, elyse, strength, intel)
    elif(result5 == 2):
        print("You make your way inside, unseen and unheard.")
        chapter = gen_header(chapter)
        result6 = act_six(player, sign, caught, godfrey, elyse, strength, intel)
    else:
        print("Oh no! The rope couldn't hold the two of you!")
        print("You've fallen from a great height!")
        end(5, player, sign, caught, godfrey, elyse, luck, intel)

    # Act six options. If you are heard, you cannot sneak. Godfrey can help. Strength does too.
    if(result6 == 1):
        time.sleep(2)
        print("\nAmazing! A flawless strike! Elyse will be proud!")
        print("The King falls to the floor!")
        end(1, player, sign, caught, godfrey, elyse, luck, intel)
    elif(result6 == 2):
        time.sleep(2)
        print("\nThe King's defense is futile! You strike him one last time.")
        print("The King falls to the floor!")
        end(2, player, sign, caught, godfrey, elyse, luck, intel)
    elif(result6 == 3):
        time.sleep(2)
        print("\nArgh! The King takes the last slice at you!")
        print("You can't make it! The King is hurt as well!")
        print("You crumple to the floor.")
        end(3, player, sign, caught, godfrey, elyse, luck, intel)
    else:
        time.sleep(2)
        print("\nYou jump from behind the curtain with your sword!")
        print("The King isn't amused, he was searching for an intruder!")
        print("He takes a swing at you, though you were keeping it civil.")       
        end(5, player, sign, caught, godfrey, elyse, luck, intel)

  
######################################
#
#  Write the chapters
#

# Act one: The heist
def act_one(player, sign, luck, intel):
    print("The world is in turmoil. An evil king is in power, and zealots follow his every bidding.")
    print("The nobles have become rich, the commoners have become criminals, and the poor have become dead or worse.")
    print("Struggling to survive, you find yourself in a grocery store heist with your accomplice GODFREY!")
    # If you're dumb, no one makes sense
    if(intel > 1):
        print("GODFREY: \"Quick, ", player, "! We have to make it out of here!\"", sep="")
    else:
        print("GODFREY: \"C'mon, ", player, "! Sjklfa joijf jio!\"", sep="")
    print("But alas, a guard is making their way past the windows. They will definitely see you!")
    print("\nYou have to decide what you're going to do!")
    print("1: Hide under the clerks' desk")
    print("2: Try to open the back door")
    print("3: Hide behind the magazine rack")
    print("\n")
    sidekick_bar("Godfrey", "(**)", "Alive")
    choice = gen_choice(3)
    if(choice == 3):
        choice = roll_dice(luck, 3, sign, False, 1, 2)
        return choice
    else:
        return choice


# Act two: Escape route
def act_two(player, intel):
    if(intel > 1):
        print("GODFREY: \"We did great, I have enough to eat for weeks, ", player, ".\"", sep="")
        print(str.upper(player), ": \"I did well, myself. I'm carrying a lot though, and it's getting dark.\"", sep="")
        print("GODFREY: \"We'd better get a move on, I want to keep all of this.\"")
        print("GODFREY: \"My place is not far from here, we should go.\"")
    else:
        print("GODFREY: \"W'all BE jurapaja, ", player, ". Wabaul halakwh!\"", sep="")
        print(str.upper(player), ": \"Hyuk, got me noms.\"", sep="")
        print("GODFREY: \"EWqhiof, eiowru fdsiocxv ouieorwl iouopqwe.\"")
        print("GODFREY: \"Ijkoh wolololooooo.\"")
    print("\nYou can choose to return to your home or to Godfrey's.")
    if(intel > 1):
        print("1: \"I know my route better.\"")
        print("2: \"Less risk, let's go to yours.\"")
    else:
        print("1: \"Imma go see home.\"")
        print("2: \"Las go den\"")
    print("\n")
    sidekick_bar("Godfrey", "(**)", "Alive")
    choice = gen_choice(2)
    return choice


# Act three: Confrontation
def act_three(player, sign, luck, intel):
    print("Before you stands the King, his name: King Harrod I. His lustrous robe seeps across the floor to your knees.")
    print("A crowd has gathered, the King himself flanked by his guardsmen.")
    if(intel > 1):
        print("KING: \"You stand judged, ", player, ". Your thief-friend GODFREY does too.\"", sep="")
        print("KING: \"If our glorious Kingdom weren't in these... Conditions, you would've been dead by now.\"")
        print("KING: \"I give you one chance to repent for your petty crimes, and join the Kingdom in our defense.\"")
    else:
        print("KING: \"DARKLU, ", player, ". Skewjro iofheiow oipoi.\"", sep="")
        print("KING: \"Worbleg blhlahl ewirouqp tagawaga ijojl awalu gogou.\"")
        print("KING: \"Dsfargeg blargagag no do u do lahall.\"")
    print("\nConsider your words wisely! You're in a bad position!")
    if(intel > 1):
        print("1: \"My good King, I repent and will join the Kingdom!\" (Lie)")
    else:
        print("1. \"Haw haw, u big man, fuzzy cape, me join!\" (Lie)")
    print("2: The crowd is scarce. Run for it.")
    if(intel > 1):
        print("3: Spit on the ground. \"I will never join your ranks, scum!\"")
    else:
        print("3: Spit on the ground. \"Iuno what you be sayin, grampa!\"")
    print("\n")
    sidekick_bar("Godfrey", "(**)", "Alive")
    choice = gen_choice(3)
    if(choice == 2):
        choice = roll_dice(luck, 3, sign, False, 2, 3)
        return choice
    else:
        return choice

  
# Act four: Friend or foe
def act_four(player, caught, godfrey, intel):
    print("The days of the Kingdom's end draw near. Rebellion is in the air.")
    print("As the leaves burn orange, you make your way to a tavern, filled to the brim with gamblers, drunkards, and dregs.")
    print("But one woman sits in the far corner, seemingly detached from the debauchery.")
    print("You approach. Her clothes betray that she is no commoner, nor is she a regular here.")
    # If you've been caught, she knows you
    if(caught == True):
        if(intel > 1):
            print("ELYSE: \"Surely you didn't think I'd come to find you here, ", player, ". Listen, I could use your help.", sep="")
        else:
            print("ELYSE: \"O u poor lil, ", player, ". SDFkreab babalab jfdsoi.", sep="")
    else:
        if(intel > 1):
            print("ELYSE: \"Listen closely, beggar. If you want coin, you're going to have to work for it.\"")
        else:
            print("ELYSE: \"CMON n get ufdsa ioadsjfo hiowerjo ooipoqwe dsagdg\"")
    if(intel > 1):
        print("ELYSE: \"Let's assume that I know the King a little more closely than I'd like. He is family.\"")
        print("ELYSE: \"His madness needs to stop, and I'm prepared to deal with whatever consequences.\"")
        print("ELYSE: \"I have access to the Royal Palace. I want his reign to end. Discreetly. No more war.\"")
        print("\nShe doesn't seem like the type to be joking. Choose a path.")
        print("1: \"You read my mind. I can make a move by the week's end.\"")
        print("2: \"I don't know you, I don't trust you. I already had similar plans.\"")
        print("3: \"After everything that I've been through? No. The Kingdom can rot.\" **")
    else:
        print("ELYSE: \"LEGGO n sey fasfsjofe joijiow  dfs;llp dem keng jdoisfj.\"")
        print("ELYSE: \"JKLFDSwf n u gon fite  jfdsjaof lkfjdsa tt o der.\"")
        print("ELYSE: \"Dat plase jdfkaje vklj er mine jfdosj u c.\"")
        print("\nOh hahaha, she a womman, she say halp.")
        print("1: \"Well err eehhh i can do it.\"")
        print("2: \"I be goin ma own ways, womman.\"")
        print("3: \"I got meself a beer, y u talken?\" **")
    print("\n")
    if(godfrey == True):
        sidekick_bar("Godfrey", "(**)", "Alive")
    else:
        sidekick_bar("Godfrey", "(**)", "Dead")

    choice = gen_choice(3)
    if(choice == 3):
        if(godfrey == True):
            return choice
        else:
            choice = 4
            return choice
    else:
        return choice


# Act five: Castle siege
def act_five(caught, sign, godfrey, elyse, luck, intel):
    print("A full moon casts light over the Royal Castle. You stand by the stables.")
    print("Before you, there are multiple avenues of approach.")
    print("A tall window could be climbed to, but it could be risky if many attempt it.")
    print("A door is tucked around the bend, but it seems dangerous, if not locked.")
    print("The guardsmen on patrol aren't paid well, they could be bribed, but it's unlikely.")
    print("\nHow will you go about this?")
    if(godfrey == True):
        print("1: Climb the window. **")
    else:
        print("1: Climb the window.")
    if(elyse == True):
        print("2: Try the back door. ++")
    else:
        print("2: Try the back door.")
    print("3: Bribe the guards.")
    print("\n")
    if(godfrey == True):
        sidekick_bar("Godfrey", "(**)", "Alive")
    else:
        sidekick_bar("Godfrey", "(**)", "Dead")
    if(elyse == True):
        sidekick_bar("Elyse", "(++)", "Alive")

    out_choice = False
    choice = gen_choice(3)
    # Option one is risky, but always available. Godfrey risks breaking the rope.
    if(choice == 1):
        if(godfrey == True):
            choice = roll_dice(luck, 3, sign, False, 1, 3)
            return choice
        else:
            return choice
    # Option two doesn't work if Elyse does not join
    elif(choice == 2):
        if(elyse == True):
            print("\nThanks to the help of Elyse, the door is unlocked!")
            return choice
        # A little bit of acrobatics here. Locks the option from future use.
        else:
            # Circuit to window because guard can't be bribed
            if(caught == True):
                print("We're out of options here. To the window we go.")
                choice = 1
                return choice
            # Recreate options if guards can be bribed
            else:
                print("\nThe door is locked! We can't go this way.")
                print("We'll have to choose another way.")
                if(godfrey == True):
                    print("1: Climb the window. **")
                else:
                    print("1: Climb the window.")
                print("2: Bribe the guards.")
                choice = gen_choice(2)
                if(choice == 1):
                    if(godfrey == True):
                        choice = roll_dice(luck, 3, sign, False, 1, 3)
                        return choice
                    else:
                        return choice
                # Guard gambling here
                else:
                    choice = roll_dice(luck, 7, sign, False, 2, 1)
                    if(choice == 2):
                        print("\nThe guard buys it! It looks like he'll let us in.")
                        print("With help, we are able to get in through the back door.")
                        return choice
                    else:
                        print("We're out of options here. To the window we go.")
                        if(godfrey == True):
                            choice = roll_dice(luck, 3, sign, False, 1, 3)
                            return choice
                        else:
                            return choice
                        
    # Option three only works (sometimes) if you weren't caught
    else:
        if(caught == True):
            print("\nThe guard looks at you, puzzled, then angrily.")
            if(elyse == False):
                print("We're out of options here. To the window we go.")
                choice = 1
                if(godfrey == True):
                    choice = roll_dice(luck, 3, sign, False, 1, 3)
                    return choice
                else:
                    return choice
            else:
                print("We'll have to choose another way.")
                if(godfrey == True):
                    print("1: Climb the window. **")
                else:
                    print("1: Climb the window.")
                print("2: Try the back door. ++")
                choice = gen_choice(2)
                if(choice == 1):
                    if(godfrey == True):
                        choice = roll_dice(luck, 3, sign, False, 1, 3)
                        return choice
                    else:
                        return choice
                else:
                    print("\nThanks to the help of Elyse, the door is unlocked!")
                    return choice
        # Actual guard gambling here    
        else:
            choice = roll_dice(luck, 7, sign, False, 2, 1)
            # Pass
            if(choice == 2):
                print("\nThe guard buys it! It looks like he'll let us in.")
                print("With help, we are able to get in through the back door.")
                return choice
            # Fail
            else:
                print("\nThe guard looks at you, puzzled, then angrily.")
                # Circuits to window because door won't work
                if(elyse == False):
                    print("We're out of options here. To the window we go.")
                    if(godfrey == True):
                        choice = roll_dice(luck, 3, sign, False, 1, 3)
                        return choice
                    else:
                         return choice
                # Gives second chance for Elyse door
                else:
                    print("We'll have to choose another way.")
                    if(godfrey == True):
                        print("1: Climb the window. **")
                    else:
                        print("1: Climb the window.")
                    if(elyse == True):
                        print("2: Try the back door. ++")
                    choice = gen_choice(2)
                    if(choice == 1):
                        if(godfrey == True):
                            choice = roll_dice(luck, 3, sign, False, 1, 3)
                            return choice
                        else:
                            return choice
                    else:
                        print("\nThanks to the help of Elyse, the door is unlocked!")
                        return choice
                        

# Act six: Final battle
def act_six(player, sign, caught, godfrey, elyse, strength, intel):
    print("Alas, you have made it into the King's chambers! This is it!.")
    print(player, ", it's too late to turn back! You must make a move!", sep="")
    print("You hear a noise creaking down the hallway. You hide.")
    print("The King is suspicious, but might not know you're here.")
    print("\nChoose your attack.")
    if(godfrey == True):
        print("1: Lunge at him! **")
    else:
        print("1: Lunge at him!")
    print("2. Intimidate him!")
    if(caught == False):
        print("3: Sneak attack!")
    print("\n")
    if(godfrey == True):
        sidekick_bar("Godfrey", "(**)", "Alive")
    else:
        sidekick_bar("Godfrey", "(**)", "Dead")
    if(elyse == True):
        sidekick_bar("Elyse", "(++)", "Alive")
    # Option Segment One: Not caught
    if(caught == False):
        choice = gen_choice(3)
        # To do: I could probably make vars to throw into the function, then call once
        # Option 1:1: Chance roll
        if(choice == 1):
            if(elyse == True):
                choice = roll_dice(strength, 6, sign, godfrey, 1, 3)
                return choice
            else:
                choice = roll_dice(strength, 6, sign, godfrey, 2, 3)
                return choice
        # Option 1:2: You die.            
        elif(choice == 2):
            choice = 4
            return choice
        # Option 1:3: Sneak, chance roll with less requirement
        else:
            if(elyse == True):
                choice = roll_dice(strength, 5, sign, godfrey, 1, 3)
                return choice
            else:
                choice = roll_dice(strength, 5, sign, godfrey, 2, 3)
                return choice
    # Option Segment Two: Caught
    else:        
        choice = gen_choice(2)
        # Option 2:1: Chance roll
        if(choice == 1):
            if(elyse == True):
                choice = roll_dice(strength, 6, sign, godfrey, 1, 3)
                return choice
            else:
                choice = roll_dice(strength, 6, sign, godfrey, 2, 3)
                return choice
        # Option 2:2: You die.
        else:
            choice = 4
            return choice          
    if(godfrey == True):
        sidekick_bar("Godfrey", "(**)", "Alive")
    else:
        sidekick_bar("Godfrey", "(**)", "Dead")
    if(elyse == True):
        sidekick_bar("Elyse", "(++)", "Alive")

######################################
#
# Endings specifically
#

# Create endings  
def end(num, player, sign, caught, godfrey, elyse, luck, intel):
    time.sleep(1)
    print("\n******************************************")
    if(num == 1):
        print("Congratulations! You've won the game!")
        print("The Kingdom, rulerless, will be claimed by ELYSE the benevolent.")
        print("The days of King Harrod I have come to a magnificient end.")
        print("Thank the high heavens! Thanks to our star, ", sign, "!", sep="")
        print("The name", str.upper(player), "will be etched into history books forever!")
        gen_achievements(sign, caught, godfrey, elyse, luck, intel)
    elif(num == 2):
        print("Congratulations! You've won the game!")
        print("The Kingdom, rulerless, has its brightest days ahead!")
        print("Who knows what the future holds for our heroes?")
        print(player, "Take this time to celebrate victory!")
        gen_achievements(sign, caught, godfrey, elyse, luck, intel)
    elif(num == 3):
        print("Congratulations! You've finished the game!")
        print("Though your attack was unsuccessful, the King got a message!")
        print("The stars were not on your side! Curses, ", sign, "!", sep="")
        print("Your name, ", player, ", will be remembered as the usurper!", sep="")
        gen_achievements(sign, caught, godfrey, elyse, luck, intel)
        print("Would you like to play again?")         
    elif(num == 4):
        print("Congratulations! You've finished the game!")
        print("Who is to say that we should interfere with nature's course?")
        print("The downfall of the Kingdom will be by its own hands")
        print("Though you were no hero, ", player, ", you did not help evil either.")
        gen_achievements(sign, caught, godfrey, elyse, luck, intel)            
    else:
        print("You have died! Your actions were foolish.")
        print("The stars were not on your side! Curses, ", sign, "!", sep="")
        print("Consider investing your STRENGTH and LUCK wisely, next time.")        
    print("\nWould you like to play again?")
    choice = gen_yesno()
    if(choice == "YES"):
         main()
    else:
         print("Goodbye")


######################################
#
# Calculations, etc
#

# Calculate how unlucky you are
# Format: Stat modifier, required roll, godfrey assistance,
# Player's choice if win, reverted choice if loss
def roll_dice(stat, cutoff, sign, assist, win, lose):
    time.sleep(1)
    num = random.randint(1, 10)
    original = num
    print("\nRolling the dice!")
    print("Stat level:", stat)
    if(stat < 2):
        print("Stat modifier: -2 Roll")
        num -= 2
    elif(stat == 2):
        print("Stat modifier: +1 Roll")
        num += 1
    else:
        print("Stat modifier: +2 Roll")
        num += 2
    if(sign == "Uranus"):
        cutoff += 1
        print("Astrology modifier: +1 Difficulty")
    if(assist == True):
        cutoff -= 1
        print("Companion modifier: -1 Difficulty")
    time.sleep(1)
    if(num >= cutoff):
        print("You rolled ", num, ". You needed a ", cutoff, "!", sep="")
        print("Unmodified roll:", original)
        if(num > 9):
            print("CRITICAL!")
        print("Pass!")
        return win
    else:
        print("You rolled ", num, ". You needed a ", cutoff, "!", sep="")
        print("Unmodified roll:", original)
        print("Fail!")
        return lose

# Chapter titles
def gen_header(chapter):
    chapter+= 1
    time.sleep(1)
    print("\n******************************************")
    print("CHAPTER", chapter, "\n")
    time.sleep(1)
    return chapter
    
# Sidekick healthbar
def sidekick_bar(sidekick, key, status):
    print("Your companion ", sidekick, " is ", status, ". ", key, sep="")

# Number sanitizer
def gen_choice(options):
    valid = False
    # It feels a bit redundant to put a sentinel then a return
    # Left in for legibility
    while(valid != True):
        try:
            choice = int(input("\nWhich do you choose? "))
            if(choice > options):
                print("\nErr... Something's not right! Number is too high!")
            elif(choice < 1):
                print("\nErr... Something's not right! Number is too low!")
            else:
                valid = True
        except ValueError:
            print("Uhh... Look at the keyboard and type a number!")
    return choice

# Yes/No sanitizer
def gen_yesno():
    valid = False
    while(valid != True):
        try:
            choice = str.upper(input("\nWhich do you choose? YES or NO: "))
            if(choice == "YES"):
                valid = True
            elif(choice == "NO"):
                valid = True
            else:
                print("That's not YES or NO!")
        except ValueError:
            print("Uhh... Type YES or NO this time!")
    return choice

# Would like to add: A ladder function for Godfrey to clean up act five a little

# List some feats you made during your journey
def gen_achievements(player, caught, godfrey, elyse, luck, intel):
    score = 1
    print("\n******************************************")
    print("You have won the following ACHIEVEMENTS:\n")
    if(godfrey == True):
        print("ACCOMPLICE: You beat the game with GODFREY still alive!")
        score+= 2
    if(elyse == True):
        print("INSIDER: You beat the game with ELYSE helping!")
        score+= 2
    if(caught == False):
        print("SNAKE: You beat the game without being seen!")
        score+= 2
    if(player == "Smartass"):
        print("NO_ONLY: You fought the law and the law won!")
        score+= 1
    if(luck > 2):
        print("MAGICIAN: You beat the game with MAX luck!")
        score+= 1
    if(intel < 2):
        print("BLORG: Yarg babble raba lo luwuwuwuw!")
        score-= 1
    if(player == "Bookworm" or player == "Neo"):
        print("STUDIOUS: You haxxed to get full intel!")
        score-= 1
    # Calculate game score based on handicap
    if(score > 5):
        time.sleep(1)
        print("\nYou beat the TEXT ADVENTURE(tm) on EASY!")
    elif(score > 3):
        time.sleep(1)
        print("\nYou beat the TEXT ADVENTURE(tm) on MEDIUM!")
    elif(score > 1):
        time.sleep(1)
        print("\nYou beat the TEXT ADVENTURE(tm) on HARD!")
    else:
        time.sleep(1)
        print("\nNightmare! You beat the TEXT ADVENTURE(tm) against all odds!")


#eof  
main()

