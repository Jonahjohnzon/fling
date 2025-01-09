import React from 'react'

export const Encode = (s) => {
    return s?.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/\s+/g, '-') // spaces to dashes
    .replace(/&/g, '-and-') // ampersand to and
    .replace(/\+/g, '-plus-') // plus to plus
    .replace(/[^\w\-]+/g, '') // remove non-words
    .replace(/\-\-+/g, '-') // collapse multiple dashes
    .replace(/^-+/, '') // trim starting dash
    .replace(/-+$/, '') // trim ending dash
    .replace(/\//g, '-or-'); // replace / with -or-
}

export const Decode = (s) => {
    return s?.replace(/-and-/g, ' & ') // replace -and- with &
    .replace(/-plus-/g, '+') // replace -plus- with +
    .replace(/-or-/g, ' / ') // replace -or- with /
    .replace(/-/g, ' '); // replace dashes with spaces
}
