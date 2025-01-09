import React from 'react'

const Type = ({info}) => {
    const currentDate = new Date();
    const accountAgeInMonths = (currentDate - new Date(info?.createdAt)) / (1000 * 60 * 60 * 24 * 30);
    let modtype;
    if (info?.mod?.body) {
      modtype = "Mod";
    } else if (info?.supermod) {
      modtype = "Supermod";
    } else if (info?.admin) {
      modtype = "Admin";
    } else {
      if (accountAgeInMonths < 1) {
        modtype = "Newbie";
      } else {
        modtype = "Member";
      }
    }
  return (
    <div>{modtype}</div>
  )
}

export default Type