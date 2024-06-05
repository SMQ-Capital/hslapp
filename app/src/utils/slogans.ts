const SLOGANS = [
    'a most excellent',
    "the wizard's choice",
    'a dazzingly accurate',
    'a seriously awesome',
    'a delightfully simple',
    'a perfectly balanced',
    'a deliciously vibrant',
    'a deliciously tasteful',
    'an incredibly stylish',
    'a beautifully crafted',
    'an amazingly versatile',
    'a stunningly elegant',
    'a fantastically fresh',
    'a superbly sophisticated',
    'a marvelously minimal',
    'a wonderfully whimsical',
    'a perfectly precise',
]

export const Slogans = {
    randomSlogan: () => {
        return SLOGANS[Math.floor(Math.random() * SLOGANS.length)]
    },
}
