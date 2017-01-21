import React from 'react'

const FormatDate = ({value}) => <span>{applyFormat(value)}</span>

export default FormatDate

function applyFormat (s) {
  const date = new Date(s)
  const yyyy = date.getFullYear()
  const mm = padLeft(date.getMonth() + 1)
  const dd = padLeft(date.getDate())
  const hh = date.getHours()
  const min = date.getMinutes()
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`
}

function padLeft (s, length = 2) {
  while (s.toString().length < length) {
    s = '0' + s
  }
  return s
}
