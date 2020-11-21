//const is being used so I can declare variables inside and outside the block scope.
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

//keeps track of what the player has on them.
//The let keyword allows me to redeclear a variable without causing a problem.
//It is also used in the block scope like const, this is so I can call these declared variables in multiple functions
let state = {}

//Start game function to start up the game
//and set all of the state and application where it needs to be.
function startGame() {
    state = {}      //make sure the state is variable is empty object at the start.
    showTextNode(1) //This shows the first text prompt declared lower in the code.

}

//Displays what option the player is on.
//It takes a particular index of a text node
function showTextNode(textNodeIndex) { 
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex) //finds the current node youre on.
    textElement.innerText = textNode.text  //places the text in the html document where the id is called.
    while(optionButtonsElement.firstChild) { //This while loop clears the options 
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => { 
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button) //The appendChild is used here to update the text node, which is the child function.
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

//this selects the option that the player chooses.
function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState) //this updates and assigns the state or whats in the players content.
    showTextNode(nextTextNodeId)  //Shows next text node.
}

//The text nodes are defined in the oject here.
const textNodes = [
    {
        id: 1, //very first text node.
        text: 'You are walking down the street and have no memory of how you got there. You see something out of the corner of your eye. Its a lock-box.',
        options: [
            {
                text: 'Take the Box', //text in the option box
                setState: { LockBox: true }, //Boolean true or false to place item in content.
                nextText: 2 //Moves you on to the next prompt.
            },
            { 
                text: 'Leave it', //text to not grab item
                nextText: 2
            }
        ]
    },
    {
        id: 2, //second text node.
        text: 'You continue walking down the street still wondering if you should head home, when all of the sudden you hear someone call out.',
        options: [
            {
                text: 'Talk to the voice from the ally.',
                nextText: 3
            },
            {
                text: 'Ignore the drunk and keep walking',
                nextText: 4
            }
        ]
    },
    {
        id: 3, //Third node.
        text: 'You stopped to talk to the voice in the ally, the hidden figure gives you a note.',
        options: [
            {
                text: 'Put note in bag and continue on your way.',
                setState: { LockBox: true, MysteriousNote: true}, //updates your content adding the note.
                nextText: 4
            }
        ]
    },
    {
        id: 4,
        text: 'You continue walking when someone runs into you. They say sorry and ask if you have a note for them.',
        options: [
            {
                text: 'Give them the note for free',
                requiredState: (currentState) => currentState.MysteriousNote, //This option is only available to those with a mysterious note.
                setState: { LockBox: true, MysteriousNote: false},
                nextText: 19
            },
            {
                text: 'Trade note for $100',
                requiredState: (currentState) => currentState.MysteriousNote,
                setState: { LockBox: true, MysteriousNote: false, Money: true},
                nextText: 5
            },
            {
                text: 'Ignore the man because you have no idea what hes talking about.',
                nextText: 5
            }

        ]
    },
    {
        id: 5,
        text: 'You have had a strange nitght so far and you are getting tired. Before you even notice you find yourself infront of a motel.',
        options: [
            {
                text: 'Enter the motel in hopes to get a room',
                nextText: 6
            },
            {
                text: 'Shout sleep is for the weak and turn back the way you came.',
                nextText: 8
            }
        ]
    },
    {
        id: 6,
        text: 'You walk up to the man at the front and ask for a room. it will cost $100 to stay the night.',
        options: [
            {
                text: 'Give the man your money and go to sleep.',
                requiredState: (currentState) => currentState.Money,
                setState: {LockBox: false, Money: false},
                nextText: 7
            },
            {
                text: 'Exit the motel and figure something else to do.',
                nextText: 8
            }
        ]
    },
    {
        id: 7,
        text: 'You are dreaming of flying, when suddenly your door slams open and the man at the front runs in. You notice your belongings are gone. The man at the front knocks you out.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 8,
        text: 'You are looking for something to do. There is a bar to your left, a park to your right, or you can keep walking to forward through the intersection.',
        options: [
            {
                text: 'Go grab a drink at the bar.',
                nextText: 9
            },
            {
                text: 'Go walk through the park late at night.',
                nextText: 10
            },
            {
                text: 'Keep on walking. Nothin better than the road.',
                nextText: 11
            }
        ]
    },
    {
        id: 9,
        text: 'You entered the bar and somehow talk the first person you see into buying you a drink, his name is Light. After you are well past drunk Light attempts to grab the Lock Box. What do you do?',
        options: [
            {
                text: 'Use lock Box to defend yourself',
                requiredState: (currentState) => currentState.LockBox,
                nextText: 12
            },
            {
                text: 'Offer Light the Money.',
                requiredState: (currentState) => currentState.Money,
                setState: {Money: false},
                nextText: 13
            },
            {
                text: 'Enter hand to hand combat',
                nextText: 14
            }
        ]
        
    },
    {
        id: 10,
        text: 'You decided to walk through the park after getting angry about taxes. You happen to find a knife.',
        options: [
            {
                text: 'You take the knife and decide to go to the bar.',
                setState: {Knife: true},
                nextText: 9
            }
        ]
    },
    {
        id: 11,
        text: 'You decided to keep on walking, now all you have to do is cross the busy street. You took one step out and were hit by a car....',
        options: [
            {
                text: 'Restart.',
                nextText: -1
            }
        ]
    },
    {
        id: 12,
        text: 'You swung and hit Light with the Box, A bystander notices you attack Light with the object and stops the fight. He calls the police and you are sent to jail.',
        options: [
            {
                text: 'Restart.',
                nextText: -1
            }
        ]
    },
    {
        id: 13,
        text: 'Light takes the money and walks away at first, then he runs at you with full speed.',
        options: [
            {
                text: 'Enter hand to hand combat.',
                nextText: 14
            },
            {
                text: 'Take out Knife and defend yourself.',
                requiredState: (currentState) => currentState.Knife,
                nextText: 15
            },
            {
                text: 'Run away screw the money.',
                nextText: 16
            }
        ]
    },
    {
        id: 14,
        text: 'Light is running at you, What do you do?',
        options: [
            {
                text: 'Punch.',
                nextText: 17
            },
            {
                text: 'Use the crane Kick like you had seen in the movie Karate Kid.',
                nextText: 15
            },
            {
                text: 'Flying HeadButt.',
                nextText: 17
            },
            {
                text: 'Take out Knife and defend yourself.',
                requiredState: (currentState) => currentState.Knife,
                nextText: 15
            },
        ]
    },
    {
        id: 15,
        text: 'You defeated light and grabed his Belongings. You obtained a gun with two shots and a map that leads to an X.',
        options: [
            {
                text: 'Head toward the X',
                setState: { Gun: true, map: true},
                nextText: 18
            }
        ]
    },
    {
        id: 16,
        text: 'You Ran away but Light eventually caught up and shot you......',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 17,
        text: 'You attack with everything you have. After Light realizes he cant beat you, he pulls a gun out and shoots you....',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]

    },
    {
        id: 18,
        text: 'It is still very dark out and its starting to feel like night will never end. You get to the X on the map and its an old looking warehouse. You are still pretty far away and can see someone at the front door.',
        options: [
            {
                text: 'Walk up to the front door.',
                nextText: 20
            },
            {
                text: 'Look around back for another entrance.',
                nextText: 21
            },
            {
                text: 'Look around for something useful.',
                nextText: 22
            }
        ]
    },
    {
        id: 19,
        text: 'Because of your kindness the man gives you $100 and a Ruby....',
        options: [
            {
                text: 'Put things in bag and continue.',
                setState: { Money: true, Ruby: true},
                nextText: 5
            }
        ]

    },
    {
        id: 20,
        text: 'You walked up to the front entrance and decide to talk to the man. He will let you in if you have the item he seeks. He requires a Missing ring or a Ruby.',
        options: [
            {
                text: 'Give him the Ruby.',
                requiredState: (currentState) => currentState.Ruby,
                setState: { Ruby: false},
                nextText: 25
            },
            {
                text: 'Offer him some money.',
                requiredState: (currentState) => currentState.Money,
                setState: { Money: false},
                nextText: 24
            },
            {
                text: 'Head outside to see if you can find something to trade with.',
                nextText: 22
            },
            {
                text: 'Give him the lost ring that you found.',
                requiredState: (currentState) => currentState.Ring,
                setState: { Ring: false},
                nextText: 25
            }
        ]
    },
    {
        id: 21,
        text: 'You found a door in the back, should you try to break in?',
        options: [
            {
                text: 'Break in.',
                nextText: 23
            },
            {
                text: 'look for something useful.',
                nextText: 22
            }
        ]
    },
    {
        id: 22,
        text: 'You looked around the area and found a golden Ring.',
        options: [
            {
                text: 'Put the Ring in bag and head back to the front Door.',
                setState: { Ring: true},
                nextText: 20
            }
        ]
    },
    {
        id: 23,
        text: 'You tried to break in and got caught. You have been shot....',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 24,
        text: 'The money wasnt useful and now you have no money.',
        options: [
            {
                text: 'Go look around for something useful.',
                nextText: 22
            }
        ]
    },
    {
        id: 25,
        text: 'You have made it inside the building and you can feel the adventure coming to a close. You hear someone coming. Quick Hide!',
        options: [
            {
                text: 'Hide in closet.',
                nextText: 26
            },
            {
                text: 'Wait in the dark and attack with the Gun.',
                requiredState: (currentState) => currentState.Gun,
                nextText: 27
            },
            {
                text: 'Wait in the dark and attack with the Knife.',
                requiredState: (currentState) => currentState.Knife,
                nextText: 28
            },
            {
                text: 'Shout Bring it on',
                nextText: 29
            }
        ]
    },
    {
        id: 26,
        text: 'You hid in the closet and waited for the man to pass. After three minutes of waiting you open the door and continue the adventure',
        options: [
            {
                text: 'Continue',
                nextText: 30
            }
        ]
    },
    {
        id: 27,
        text: 'You waited until you could see the man. You shoot twice, missing the first and killing him with the second. You can now hear multiple people coming.',
        options: [
            {
                text: 'Shout BRING IT ON',
                nextText: 29
            },
            {
                text: 'Wait in the dark and attack with the Knife.',
                requiredState: (currentState) => currentState.Knife,
                nextText: 31
            },
            {
                text: 'Hide in closet.',
                nextText: 32
            },
            {
                text: 'Run out the front door.',
                nextText: 33
            }

        ]
    },
    {
        id: 28,
        text: 'You hid in the dark and perfectly executed a silent kill. You hide the body in the closet and obtained a flash light.',
        options: [
            {
                text: 'Continue',
                setState: { FlashLight: true},
                nextText: 30
            }
        ]
    },
    {
        id: 29,
        text: 'You shouted bring it on. Sadly you shouldnt have done that, you were met with 5 armed men and got shot.....',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 30,
        text: 'You walked deeper into the building, its getting darker the deeper you go.',
        options: [
            {
                text: 'Use the flashlight that you obtained.',
                requiredState: (currentState) => currentState.FlashLight,
                nextText: 34
            },
            {
                text: 'Keep on walking, nothing can stop you at this point.',
                nextText: 35
            },
            {
                text: 'Go back to the area with the closet.',
                nextText: 36
            },
        ]
    },
    {
        id: 31,
        text: 'You waited in the dark and attacked killing the first man, before you realize it 3 more are there. You have been shot.',
        options: [
            {
                text: 'Restart.',
                nextText: -1
            }
        ]
    },
    {
        id: 32,
        text: 'It was no use, they opened the closet and fired. You have been shot....',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 33,
        text: 'You ran out the front of the building. The man at the front Stops you, at this point you can hear the guards more clearly. They are getting closer. What do you do now?',
        options: [
            {
                text: 'Ask for help and offer the man at the door a Ruby.',
                requiredState: (currentState) => currentState.Ruby,
                setState: { Ruby: false},
                nextText: 37
            },
            {
                text: 'Ask for help and offer the man at the door a Ring.',
                requiredState: (currentState) => currentState.Ring,
                setState: { Ring: false},
                nextText: 37
            },
            {
                text: 'Use the Gun you have.',
                requiredState: (currentState) => currentState.Gun,
                nextText: 38
            },
            {
                text: 'Use the Knife you have.',
                requiredState: (currentState) => currentState.Knife,
                nextText: 38
            },
            {
                text: 'Keep trying to run.',
                nextText: 39
            }
        ]
    },
    {
        id: 34,
        text: 'You turn on the flashlight and see a map of the building. You can head to the basement, the office, or the top floor.',
        options: [
            {
                text: 'Basement',
                nextText: 40
            },
            {
                text: 'top floor',
                nextText: 41
            },
            {
                text: 'Office',
                nextText: 42
            }
        ]
    },
    {
        id: 35,
        text: 'You kept on walking in the darkness until you mistakingly walk into a wall. You get up after being out for some time. There is a man pointing a gun at you.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 36,
        text: 'You walked back and found a Flash light.',
        options: [
            {
                text: 'Continue.',
                setState: { FlashLight: true},
                nextText: 30
            }
        ]
    },
    {
        id: 37,
        text: 'Thankful for the gift the man decides to help you out. His name is Zoro What will you do next?',
        options: [
            {
                text: 'Use Zoro as a distraction.',
                nextText: 43
            },
            {
                text: 'Attack with Zoro.',
                nextText: 44
            }
        ]
    },
    {
        id: 38,
        text: 'You decided to attack with a weapon. The man at the front disarms you and lets the others shoot you.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 39,
        text: 'You tried to run but the man at the front stopped you and let the others shoot you.....',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 40,
        text: 'You got to the basement and can smell something funny.',
        options: [
            {
                text: 'Investigate the smell',
                nextText: 45
            },
            {
                text: 'Go to the top floor.',
                nextText: 41
            },
            {
                text: 'Go to the office',
                nextText: 42
            }
        ]
    },
    {
        id: 41,
        text: 'The door to get to the top floor is locked.',
        options: [
            {
                text: 'Use the top floor Key',
                requiredState: (currentState) => currentState.floorKey,
                setState: { floorKey: false},
                nextText: 50
            },
            {
                text: 'Go to the Office',
                nextText: 42
            },
            {
                text: 'Go to the basement.',
                nextText: 40
            },
        ]
    },
    {
        id: 42,
        text: 'You went to the office and can see the lights are on. Wait they are off. Before you know it the door busts open and a man with a gun is looking at you.',
        options: [
            {
                text: 'Restart.',
                nextText: -1
            }
        ]
    },
    {
        id: 43,
        text: 'You used Zoro as a distraction. Sadly he didnt make it...',
        options: [
            {
                text: 'go search his body.',
                nextText: 46
            },
            {
                text: 'Try to go home, this night has been crazy.',
                nextText: 47
            },
            {
                text: 'Avenge Zoro, it was a mistake to use him that way.',
                nextText: 48
            }
        ]
    },
    {
        id: 44,
        text: 'Zoro and you attack with all you have. Zoro ended up getting shot, saving your life.',
        options: [
            {
                text: 'go search Zoros body.',
                nextText: 46
            },
            {
                text: 'Try to go home, this night has been crazy.',
                nextText: 47
            },
            {
                text: 'Go back inside and finish the adventure.',
                nextText: 30
            }
        ]
    },
    {
        id: 45,
        text: 'You decided to investigate the smell. Its a dead body....',
        options: [
            {
                text: 'Go to the Office.',
                nextText: 42
            },
            {
                text: 'Search the body.....',
                nextText: 49
            },
            {
                text: 'Go to the top floor',
                nextText: 41
            }
        ]
    },
    {
        id: 46,
        text: 'You searched Zoros body and found a strange liqued in a sealed tube.',
        options: [
            {
                text: 'Take test tube and finish the adventure.',
                setState: { Poision: true, Ruby: true, Ring: true},
                nextText: 30
            },
            {
                text: 'Try to go home, this night has been crazy.',
                nextText: 47
            }
        ]
    },
    {
        id: 47,
        text: 'You start walking home when all of a sudden you pass out..... Darkness.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 48,
        text: 'You get out of hiding and find the group of men. You run at them with everything you have. sadly they have guns and alot of them. They shoot you.....',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 49,
        text: 'You searched the body and found a key! I wonder what it goes to....',
        options: [
            {
                text: 'Take Key and go to Office.',
                setState: { floorKey: true},
                nextText: 42
            },
            {
                text: 'Take Key and go to top floor.',
                setState: { floorKey: true},
                nextText: 41
            },
        ]
    },
    {
        id: 50,
        text: 'The key you had worked!',
        options: [
            {
                text: 'Continue',
                nextText: 51
            }
        ]
    },
    {
        id: 51,
        text: 'You investigate the top floor and cant find anything important. Then you trip on an indent in the floor, it looks like a strange rock can fit in it.',
        options: [
            {
                text: 'Place the ruby inside the slot.',
                requiredState: (currentState) => currentState.Ruby,
                setState: { Ruby: false},
                nextText: 52
            },
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 52,
        text: 'The floor starts to shake and then a flash of light. You have been teleported somewhere.',
        options: [
            {
                text: 'Continue',
                setState: {LockBox: false, Ring: false, floorKey: false, map: false, Knife: false, Gun: false, flashlight: false, Money: false},
                nextText: 53
            }
        ]
    },
    {
        id: 53,
        text: 'Your vision comes back and it seems that you havent been harmed. Theres a man sitting in a chair in front of you. Theres a table in the room and a door behind the man.',
        options: [
            {
                text: 'Talk to the man',
                nextText: 54
            },
            {
                text: 'Stay silent and wait for him to talk.',
                nextText: 55
            },
            {
                text: 'Attack',
                nextText: 56
            },
        ]
    },
    {
        id: 54,
        text: 'You ask the man whats going on, he just looks at you with silence.',
        options: [
            {
                text: 'Ask again',
                nextText: 57
            },
            {
                text: 'Stay Silent',
                nextText: 55
            },
            {
                text: 'Attack',
                nextText: 56
            }
        ]
    },
    {
        id: 55,
        text: 'You wait in silence.',
        options: [
            {
                text: 'Continue waiting',
                nextText: 55
            },
            {
                text: 'Talk to the man',
                nextText: 54
            },
            {
                text: 'Attack',
                nextText: 56
            }
        ]
    },
    {
        id: 56,
        text: 'The man pushes a button on the remote in his hand shocking you. Before you know it he strikes you in the head.....',
        options: [
            {
                text: 'Continue',
                nextText: 53
            }
        ]
    },
    {
        id: 57,
        text: 'The man just stares at you in silence. After a long silence he asks if you would like a drink.',
        options: [
            {
                text: 'Yes',
                nextText: 58
            },
            {
                text: 'No',
                nextText: 59
            }
        ]
    },
    {
        id: 58,
        text: 'The man leaves the room through a door behind him. You find yourself with time alone, no one is watching, what do you do?',
        options: [
            {
                text: 'Follow him through the door',
                nextText: 60
            },
            {
                text: 'Look for another way out',
                nextText: 61
            },
            {
                text: 'Hide next to the door and attack',
                nextText: 62
            },
            {
                text: 'Stay Seated and wait for your water',
                nextText: 63
            }
        ]
    },
    {
        id: 59,
        text: 'The man leaves anyways. He exits behind through a door.',
        options: [
            {
                text: 'Follow him through the door',
                nextText: 60
            },
            {
                text: 'Look for another way out',
                nextText: 61
            },
            {
                text: 'Hide next to the door and attack',
                nextText: 62
            },
            {
                text: 'Stay Seated and wait for your water',
                nextText: 63
            }
        ]
    },
    {
        id: 60,
        text: 'You peak through the door, the left side is clear. You look to the right and its clear as well. Which way do you go?',
        options: [
            {
                text: 'Go left',
                nextText: 64
            },
            {
                text: 'Go right',
                nextText: 64
            },
            {
                text: 'Go back and sit down',
                nextText: 63
            }
        ]
    },
    {
        id: 61,
        text: 'You look for another way out, theres only one door.',
        options: [
            {
                text: 'Hide next to the door and attack',
                nextText: 62
            },
            {
                text: 'Sit back down',
                nextText: 63
            }
        ]
    },
    {
        id: 62,
        text: 'The man walks back in, you strike and hit him. He laughs clearly this was a mistake, he takes a gun out and shoots you....',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 63,
        text: 'The man walks in and places a water and a coffee down on the table in front of you. Theres a knock and he exits again.',
        options: [
            {
                text: 'Poision the water with the Zoros poision',
                requiredState: (currentState) => currentState.Poision,
                setState: { Poision: false},
                nextText: 65
            },
            {
                text: 'Poision the coffee with the Zoros poision',
                requiredState: (currentState) => currentState.Poision,
                setState: { Poision: false},
                nextText: 66
            },
            {
                text: 'Hide next to the door and attack',
                nextText: 62
            },
            {
                text: 'Wait for the man to return.',
                nextText: 67
            }
        ]
    },
    {
        id: 64,
        text: 'You start walking but hear someone coming. You can only turn back.',
        options: [
            {
                text: 'Continue',
                nextText: 63
            }
        ]
    },
    {
        id: 65,
        text: 'The man walks back in and sits down. He picks up the water and takes a sip. Within 5 seconds he starts choking and dies.',
        options: [
            {
                text: 'Exit through the door and try to escape.',
                nextText: 68
            }
        ]
    },
    {
        id: 66,
        text: 'The man walks in and sits down. He grabs the water and drinks it. He then grabs the coffee and smells it. Smelling the poision he gets angry and pulls out a gun. He shoots you.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 67,
        text: 'The man walks in the door and shoots you....',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 68,
        text: 'You walk through the door, the only thing sitting there is the Lock Box',
        options: [
            {
                text: 'Take the Lock Box',
                nextText: 69
            }
        ]
    },
    {
        id: 69,
        text: 'You search for an exit and stumble upon a room with a big desk, theres a picture of Light behind the desk.',
        options: [
            {
                text: 'Investigate the office.',
                nextText: 70
            }
        ]
    },
    {
        id: 70,
        text: 'You walk up to the desk and search for a combination code for the lock box. You find on labeled important.',
        options: [
            {
                text: 'Enter combination',
                nextText: 71
            },
            {
                text: 'Keep looking',
                nextText: 72
            }
        ]
    },
    {
        id: 71,
        text: 'You enter the combination and the box explodes. You died....',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 72,
        text: 'You look for another and find a new code hidden in a secret part of the desk.',
        options: [
            {
                text: 'Enter combination',
                nextText: 73
            }
        ]
    },
    {
        id: 73,
        text: 'You opened the box and suddenly woke up back in your bed.... It was all a dream.',
        options: [
            {
                text: 'Congratulations you have opened the Box!',
                nextText: -1
            }
        ]
    }
]

//Calls the function startGame as soon as the page loads.
startGame()