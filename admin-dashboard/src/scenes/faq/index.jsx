import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
// https://mui.com/material-ui/react-accordion/
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreItem from '@mui/icons-material/ExpandMore';
import { tokens } from '../../theme';

export default function FAQ() {
	const theme = useTheme();
	const colors = tokens(theme.palette.colors);
	return (
		<Box m="20px">
			<Header title="FAQ" subtitle="Frequently Asked Questions Page" />

			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreItem />}>
					<Typography color={colors.greenAccent[500]} variant="h5">
						Test FAQ question 1
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Test FAQ response 1: Lorem ipsum dolor sit amet consectetur,
						adipisicing elit. Corrupti exercitationem alias voluptatibus unde
						eos! Iure voluptate accusamus itaque facilis dignissimos cumque,
						eius hic in harum tenetur saepe ab laudantium deserunt?
					</Typography>
				</AccordionDetails>
			</Accordion>
			{/* testing default not expanded */}
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreItem />}>
					<Typography color={colors.greenAccent[500]} variant="h5">
						Test FAQ question 2
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Test FAQ response 2: Lorem ipsum dolor sit amet consectetur,
						adipisicing elit. Corrupti exercitationem alias voluptatibus unde
						eos! Iure voluptate accusamus itaque facilis dignissimos cumque,
						eius hic in harum tenetur saepe ab laudantium deserunt?
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreItem />}>
					<Typography color={colors.greenAccent[500]} variant="h5">
						Test FAQ question 4
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Test FAQ response 4: Lorem ipsum dolor sit amet consectetur,
						adipisicing elit. Corrupti exercitationem alias voluptatibus unde
						eos! Iure voluptate accusamus itaque facilis dignissimos cumque,
						eius hic in harum tenetur saepe ab laudantium deserunt?
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreItem />}>
					<Typography color={colors.greenAccent[500]} variant="h5">
						Test FAQ question 6
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Test FAQ response 5: Lorem ipsum dolor sit amet consectetur,
						adipisicing elit. Corrupti exercitationem alias voluptatibus unde
						eos! Iure voluptate accusamus itaque facilis dignissimos cumque,
						eius hic in harum tenetur saepe ab laudantium deserunt?
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreItem />}>
					<Typography color={colors.greenAccent[500]} variant="h5">
						Test FAQ question 7
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Test FAQ response 7: Lorem ipsum dolor sit amet consectetur,
						adipisicing elit. Corrupti exercitationem alias voluptatibus unde
						eos! Iure voluptate accusamus itaque facilis dignissimos cumque,
						eius hic in harum tenetur saepe ab laudantium deserunt?
					</Typography>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
}
