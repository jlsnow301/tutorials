# import all the required modules
import PyPDF2

file = open("Cut Sheet  (E04482).pdf", "rb")
fileReader = PyPDF2.PdfFileReader(file)

# Read the pdf
fileText = ""
for index in range (fileReader.numPages):
    page = fileReader.getPage(index)
    fileText += page.extractText() + " "

newText = ""
for letter in range(len(fileText)):
    
    # Space removal
    # Exception: SOF, EOF
    if(letter > 0 and letter < len(fileText) - 1 and fileText[letter] == " "):
        # Removes trailing spaces before colons
        if(fileText[letter + 1] == ":"):   
            continue
        # Removes space after a left parenthesis
        if(fileText[letter - 1] == "("):
            continue
        # Removes space before right parenthesis
        if(fileText[letter + 1] == ")"):
            continue
        
    # Copy to new text
    newText += fileText[letter]
    
    # Exception: Do not add more space
    if(fileText[letter] == " "):
        continue
    
    # Adds spaces before capitals
    if(fileText[letter].islower() and fileText[letter + 1].isupper()):
        newText += " "
    # Adds spaces before numbers
    if(fileText[letter].isalpha() and fileText[letter] != "S" and fileText[letter + 1].isnumeric()):
        newText += " "
    # Adds spaces after numbers
    if(fileText[letter].isnumeric() and fileText[letter + 1].isalpha()):
        newText += " "
    # Adds spaces after colons
    if(fileText[letter] == ":" and not fileText[letter - 1].isnumeric() and fileText[letter + 1] != " "):
        newText += " "
    # Adds spaces before left parenthesis
    if(fileText[letter + 1] == "("):
        newText += " "
    # Adds spaces after right parenthesis
    if(fileText[letter] == ")" and fileText[letter + 1] != " " and fileText[letter + 1] != ","):
        newText += " "
    # Adds spaces after periods
    if(fileText[letter] == "." and fileText[letter + 1] != "." and fileText[letter + 1] != " "):
        newText += " "
    # Adds spaces after directions
    # This could be one line but it's more readable in two (maybe)
    if((fileText[letter] == "N" or fileText[letter] == "E" or fileText[letter] == "S") and fileText[letter].isupper()):
        if(fileText[letter + 1].isupper() and fileText[letter + 1] != "O"):
            newText += " "
    # Adds spaces for W(est) except WA
    if(fileText[letter] == "W" and fileText[letter].isupper()):
        if(fileText[letter + 1].isupper() and fileText[letter + 1] != "A"):
            newText += " "
    # Adds spaces for time signatures
    if(fileText[letter] == "M" and fileText[letter].isupper()):
        if(fileText[letter - 1] == "P" or fileText[letter - 1] == "A" and fileText[letter - 1].isupper()):
            newText += " "

# Remove footers
noFooterText = newText
if(newText.find("Page") > 0):
    footerStart = newText.find("Page")
    footerEnd = footerStart + 8
    footerStart -= 23
    
    # Find end of footer
    lastCharFound = False
    while not(lastCharFound):
        if(newText[footerEnd].isnumeric() and newText[footerEnd + 1] == " "):
            lastCharFound = True
            footerEnd += 2
        else:
            footerEnd += 1  
    
    # Find end of page
    lastCharFound = False
    while not(lastCharFound):
        if(newText[footerStart] == " " and newText[footerStart - 1] == " " and newText[footerStart - 2].isnumeric()):
            endOfPage = footerStart
            lastCharFound = True
        else:
            footerStart -= 1
        
    sliceA = newText[0:endOfPage]
    sliceB = newText[footerEnd:len(newText)]
    revisedText = sliceA + sliceB

# Convert to JSON
jsonFile = open("Cut Sheet  (E04482).json", "w")
jsonFile.write("{\n")

# Gets the field between start and end blocks
def getBlock(start, end): # aka me on social media
    if(revisedText.find(start) <= 0 or revisedText.find(end) <= 0):
        return "error"
    startPoint = revisedText.find(start) + len(start)
    endPoint = revisedText.find(end) - 1
    
    if(len(revisedText[startPoint:endPoint]) < 3):
        return "Blank"
    else:
        return revisedText[startPoint:endPoint]           

# Writes the output to JSON
def writeBlock(key, value):
    if(jsonFile):
        jsonFile.write("\t\"" + key + "\": \"" + value + "\",\n")
    else:
        print("Error: No JSON File")
        
# Header
if(revisedText.find("Monday") > 0):
    day = revisedText.find("Monday")
if(revisedText.find("Tuesday") > 0):
    day = revisedText.find("Tuesday")
if(revisedText.find("Wednesday") > 0):
    day = revisedText.find("Wednesday")
if(revisedText.find("Thursday") > 0):
    day = revisedText.find("Thursday")
if(revisedText.find("Friday") > 0):
    day = revisedText.find("Friday")
if(revisedText.find("Saturday") > 0):
    day = revisedText.find("Saturday")
if(revisedText.find("Sunday") > 0):
    day = revisedText.find("Sunday")
    
siteName = revisedText[0:day - 1]

writeBlock("contract", siteName)

# Date
if(revisedText.find("Fremont") > 0):
    store = revisedText.find("Fremont") - 1
if(revisedText.find("Eastlake") > 0):
    store = revisedText.find("Eastlake") - 1

date = revisedText[day:store]

writeBlock("date", date)

# Ready by
readyBy = getBlock("Ready by: ", "Leave Store by: ")
writeBlock("kitchenReady", readyBy)

# Leave Store
leaveBy = getBlock("Leave Store by: ", "Start Time: ")
writeBlock("leaveBy", leaveBy)

# Event Start
eventTime = getBlock("Start Time: ", "Driver: ")
writeBlock("eventTime", eventTime)

# Site Contact
siteContact = getBlock("Site Contact: ", "Site Telephone: ")
writeBlock("siteContact", siteContact)

# Site Telephone
siteTelephone = getBlock("Site Telephone: ", "Booking Telephone: ")
writeBlock("siteTelephone", siteTelephone)

# Booking Telephone
bookingTelephone = getBlock("Booking Telephone: ", "Site Name: ")
writeBlock("bookingTelephone", bookingTelephone)

# Site Address
siteAddress = getBlock("Site Address: ", "Booking Contact")
writeBlock("siteAddress", siteAddress)

# Get Food Service Items
foodItems = getBlock("Food/Service Items ", "(1) Delivery Fee")

item = ""
itemsArray = []
for letter in range(len(foodItems)):
    if(foodItems[letter] == "-"):
        continue
    if(foodItems[letter] == " " and foodItems[letter + 1] == "-"):
        continue
    # In case of box (2)
    if(foodItems[letter] == "(" and foodItems[letter - 2] == "x" and foodItems[letter + 1].isnumeric()):
        continue
    if(letter > 2 and foodItems[letter] == "(" and foodItems[letter + 1].isnumeric()):
        item = "".join(item.rstrip().lstrip())
        itemsArray.append(item)
        item = ""
    item += foodItems[letter] 
# Off by one
itemsArray.append(item)

# Revise the list
revisedItems = []
for item in itemsArray:
    # Find the item name
    for letter in range(len(item)):
        if(item[letter].isnumeric() and item[letter + 1] == ")"):
            start = letter + 3
            break
    # Place item name with its associated quantity
    revisedItems.append(item[start:len(item)])
    revisedItems.append(item[1:start - 2])

# Write dictionary to JSON
# Gets total items as well
totalItems = 0
jsonFile.write("\t\"foodItems\": {\n")
for index in range(len(revisedItems)):
    if(index % 2 == 0):
        jsonFile.write("\t\t\"" + revisedItems[index] + "\": ")
    else:
        # Don't count cookies & brownies
        if(revisedItems[index - 1].find("Cookies") > 0 or revisedItems[index - 1].find("Brownies") > 0):
            totalItems += 1
        else: 
            totalItems += int(revisedItems[index])
        if(index < len(revisedItems) - 1):
            jsonFile.write(revisedItems[index] + ",\n")
        else:
            jsonFile.write(revisedItems[index] + "\n")
jsonFile.write("\t},\n")
jsonFile.write("\t\"totalItems\": " + str(totalItems) + "\n")

# Closes the JSON file
jsonFile.write("}")
jsonFile.close()
