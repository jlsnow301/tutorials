#############################
#
# Jeremiah Snow
# Week 9 Programming Assignment
# CSC 110 Winter 2019
# jeremiah.snow@seattlecolleges.edu
#

#
# Meteorite Data Scanner
# This program peruses a database of meteorite landings
# Then provides a UI to skim through based on name
#


#############################
#
# UI init
#
def main():
    # Format, parse, create, return
    met_dictionary = {}
    met_dictionary_file = open("Meteorite_Landings.csv", "r", encoding="utf8")
    database = met_dictionary_file.readlines()[1:]
    for line in database:
        # Format data properly
        line = line.strip()
        line = line.split(",")
        # Parse info from data
        name = line[0]
        if (line[1] == ""):
            mass = -1
        else:
            mass = int(line[1])
        if (len(line) < 4):
            lat = -1
            long = -1
        else:
            line[2] = line[2][2:]
            line[3] = line[3][1:-2]
            lat = float(line[2])
            long = float(line[3])
        # Create dictionary from info
        met_dictionary[name] = [mass, lat, long]
    met_dictionary_file.close()

    
    # User interface
    print("Welcome to the Meteorite Landings Database!")
    keep_running = True
    while keep_running:
        try:
            print("\nEnter 1 to look up information on a meteorite by name.")
            print("Enter 2 to create a new csv file that contains all meteorites greater than a specified mass.")
            print("Enter 0 to exit.")
            # Prompt user for input:
            user_resp = input("\nWhat would you like to do? ")
            if user_resp == "1":
                get_meteorite_info(met_dictionary)
            elif user_resp == "2":
                create_mass_file(met_dictionary)
            # Stop running the user interface while loop if the user doesn't want to continue    
            elif user_resp == "0":
                print("\nGoodbye")
                keep_running = False
            else:
                print("Invalid input!")
        except ValueError:
            print("Invalid input!")
            
            
            
#############################
#
# Functions init
#

# Use the database to search
def get_meteorite_info(met_dictionary):
    name = input("\nPlease enter the name of the meteorite you'd like to look up: ")
    if name in met_dictionary:
        # If key is placed before this, it produces an error
        key = met_dictionary[name]
        print("The meteorite named", name, "weighed", key[0], "grams and was found at latitude", key[1], "and longitude", key[2]) 
    else:
        print("ERROR: No meteorite data found under the name \"", name, "\".", sep="")


# Add a line to database
def create_mass_file(met_dictionary):
    user_mass = int(input("\nPlease enter a mass: "))
    met_overXgrams = []
    for name in met_dictionary:
        value = met_dictionary[name]
        if (value[0] > user_mass):
            met_entry = name, value[0]
            met_overXgrams.append(met_entry)
    met_overXgrams.sort()
    # Creates the new file for entries
    # A little trickery here required to use a variable as a filename
    met_overXgrams_file = open("%s.csv" % user_mass, "w")
    for entry in met_overXgrams:
        line = str(entry[0])+ "\n"
        met_overXgrams_file.write(line)
    met_overXgrams_file.close()
    print("File ", user_mass, ".csv created!", sep="")

    
#############################
# Call main

main()
