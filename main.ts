input.onPinPressed(TouchPin.P0, function () {
    receiver = !(receiver)
    basic.clearScreen()
})
input.onButtonPressed(Button.A, function () {
    letter = "" + letter + "."
})
input.onGesture(Gesture.Shake, function () {
    if (receiver) {
        basic.showString(msg)
    } else {
        reset()
    }
})
function translateletter (text: string) {
    while (index <= morsealphabet.length - 1) {
        if (morsealphabet[index] == text) {
            return alphabet[index]
        }
        index += 1
    }
    return ""
}
input.onButtonPressed(Button.AB, function () {
    if (!(receiver)) {
        if (letter != "") {
            lettercommit()
        } else {
            for (let value of msgmorse) {
                msg = "" + msg + translateletter(value)
            }
            radio.sendString(msg)
            basic.showIcon(IconNames.Yes)
            basic.pause(1000)
            basic.clearScreen()
            reset()
        }
    }
})
radio.onReceivedString(function (receivedString) {
    msg = ""
    if (receiver) {
        music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
        basic.showString(receivedString)
        msg = receivedString
    }
})
input.onButtonPressed(Button.B, function () {
    letter = "" + letter + "-"
})
function reset () {
    letter = ""
    msgmorse = []
    msg = ""
}
function lettercommit () {
    msgmorse.push(letter)
    basic.showString("" + (translateletter(letter)))
    letter = ""
}
let index = 0
let msg = ""
let morsealphabet: string[] = []
let alphabet: string[] = []
let msgmorse: string[] = []
let letter = ""
let receiver = false
radio.setGroup(102)
receiver = false
letter = ""
msgmorse = []
alphabet = [
"A",
"B",
"C",
"D",
"E",
"F",
"G",
"H",
"I",
"J",
"K",
"L",
"M",
"N",
"O",
"P",
"Q",
"R",
"S",
"T",
"U",
"V",
"W",
"X",
"Y",
"Z"
]
morsealphabet = [
".-",
"-...",
"-.-.",
"-..",
".",
"..-.",
"--.",
"....",
"..",
".---",
"-.-",
".-..",
"--",
"-.",
"---",
".--.",
"--.-",
".-.",
"...",
"-",
"..-",
"...-",
".--",
"-..-",
"-.--",
"--.."
]
msg = ""
basic.forever(function () {
    if (receiver) {
        basic.showLeds(`
            # . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
})
