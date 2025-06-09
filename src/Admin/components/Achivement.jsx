import { Button, Card, CardContent, Typography, styled } from '@mui/material'
import React from 'react'

const TrignleImg=styled("img")({
    right:0,
    bottom:0,
    height:170,
    position:'absolute'
})

const TrophyImg=styled("img")({
    right:36,
    bottom:20,
    height:98,
    position:'absolute'
})

const Achivement = () => {
  return (
    <div className=''>
    <Card className='' sx={{position:"relative", bgcolor:"#333945", color:"white"}}>
        <CardContent>
<Typography variant='h6' sx={{letterSpacing:".25px"}}>
    E-Bharat
</Typography>
<Typography variant='body2'>Congratulations 🤘</Typography>
<Typography variant='h5' sx={{my:2.1}}> 420.80k</Typography>

<Button size='small' variant='contained'>View sales</Button>

<TrignleImg src=''></TrignleImg>
<TrophyImg src='https://static.vecteezy.com/system/resources/previews/023/234/869/original/transparent-golden-cup-trophy-for-victory-win-at-contest-as-an-award-and-prize-for-achievement-png.png'/>
        </CardContent>
    </Card>
    </div>
  )
}

export default Achivement