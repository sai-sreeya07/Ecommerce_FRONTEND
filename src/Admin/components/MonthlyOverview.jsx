import { AccountCircle, TrendingUp } from '@mui/icons-material'
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';


const salesData=[
    {
        stats:'245k',
        tittle:"Sales",
        color:"#F4C724",
        icon:<TrendingUp sx={{frontSize:"1.75rem"}}/>
    },
    {
        stats:'12.5k',
        tittle:"Customers",
        color:"#45CE30",
        icon:<AccountCircle sx={{frontSize:"1.75rem"}}/>
    },
    {
        stats:'1.54k',
        tittle:"products",
        color:"#EC4849",
        icon:<SettingsCellIcon sx={{frontSize:"1.75rem"}}/>
    },
    {
        stats:'88k',
        tittle:"Revenue",
        color:"#6A89CC",
        icon:<CurrencyRupeeIcon sx={{frontSize:"1.75rem"}}/>
    }
]

const renderStats=()=>{
    return salesData.map((item,index)=>(
        <Grid item xs={12} sm={3} key={index}>
            <Box sx={{
                display:"flex",alignItems:'center'
            }}>
                <Avatar variant='rounded' sx={{
                    mr:3,
                    width:44,
                    boxShadow:3,
                    color:"common.white",
                    backgroundColor:`${item.color}`
                }}>
{item.icon}                   

                </Avatar>

                <Box sx={{display:'flex',flexDirection:'column'}}>

                    <Typography variant='caption'>{item.title}</Typography>
                    <Typography variant='h6'>{item.stats}</Typography>

                </Box>

            </Box>

        </Grid>
    ))
}
const MonthlyOverview = () => {
  return (
     <Card sx={{bgcolor:"#333945",color:"white"}}>
        <CardHeader title="Monthly Overview"
        action={
            <IconButton size='small'>
                <MoreVertIcon/>
            </IconButton>
        }
        subheader={
            <Typography variant='body2'>

<Box component="span" sx={{fontWeight:600, mx:2}}>

    Total 48.5% growth
    
</Box> 
😎 this month              
            </Typography>
        }
        titleTypographyProps={{
            sx:{
                mb:2.5,
                lineHeight:'2rem !important',
                letterSpacing:'.15px !important'
            }
        }}
        />
<CardContent sx={{pt:theme=>`${theme.spacing(2.5)} !important`}}>
<Grid container spacing={[5,0]}>
{renderStats()}
</Grid>   
</CardContent>  

     
     </Card>
  )
}

export default MonthlyOverview