const tailwindColors = require('tailwindcss/colors')

const {
    amber,
    black,
    blue,
    current,
    cyan,
    emerald,
    fuchsia,
    green,
    indigo,
    inherit,
    lime,
    neutral,
    orange,
    pink,
    purple,
    red,
    rose,
    sky,
    slate,
    stone,
    teal,
    transparent,
    violet,
    white,
    yellow,
    zinc,
} = tailwindColors

const colors = {
    amber,
    black,
    blue,
    current,
    cyan,
    emerald,
    fuchsia,
    green,
    indigo,
    inherit,
    lime,
    neutral,
    orange,
    pink,
    purple,
    red,
    rose,
    sky,
    slate,
    stone,
    teal,
    transparent,
    violet,
    white,
    yellow,
    zinc,
    gray: {
        ...tailwindColors.neutral,
        // 700: tailwindColors.neutral['800'],
        // discord colors
        600: '#42474D',
        700: '#36393F',
        800: '#2F3136',
        900: '#212225',
    },
}

module.exports = colors
