import React from 'react'
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import '../style/Card.css'

interface FormCardProps {
  formContent: () => JSX.Element; // Define the type of formContent prop as a function that returns JSX.Element
}

const FormCard: React.FC<FormCardProps> = ({formContent}) => {
 
  return (
    <div>
         <div className="my-card-container">
            <Card className="my-card">
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom className='d-flex content-center'>
                    Registration Form
                    </Typography>
                    <Typography variant="body1" component="p">
                       {formContent()}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default FormCard
