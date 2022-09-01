const tailwindColors = require('tailwindcss/colors')

const colors = {
    ...tailwindColors,
    gray: {
        ...tailwindColors.neutral,
        // 700: tailwindColors.neutral['800'],
        // discord colors
        ['600']: '#42474D',
        ['700']: '#36393F',
        ['800']: '#2F3136',
        ['900']: '#212225',
    },
}

module.exports = colors
