import { Card, CardContent, Typography } from '@mui/material';

interface DashboardCardProps {
  title: string;
  value: number | string;
}

const DashboardCard = ({ title, value }: DashboardCardProps) => (
  <Card sx={{ minWidth: 275, m: 2 }}>
    <CardContent>
      <Typography variant="h6" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

export default DashboardCard;