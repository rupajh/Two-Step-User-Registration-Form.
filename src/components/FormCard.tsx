import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import '../style/Card.css'

interface FormCardProps {
  formContent: () => JSX.Element; 
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
