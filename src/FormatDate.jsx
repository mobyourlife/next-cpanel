import React from 'react'

const FormatDate = ({value}) => <span>{applyFormat(value)}</span>

export default FormatDate

function applyFormat (s) {
  if (!s) {
    return '-'
  }
  
  const date = new Date(s)
  const yyyy = date.getFullYear()
  const mm = padLeft(date.getMonth() + 1)
  const dd = padLeft(date.getDate())
  const hh = padLeft(date.getHours())
  const min = padLeft(date.getMinutes())
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`
}

function padLeft (s, length = 2) {
  while (s.toString().length < length) {
    s = '0' + s
  }
  return s
}
