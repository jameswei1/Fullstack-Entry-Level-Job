import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import JobModal from './JobModal'
import Job from './Job'

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
});

export default function Jobs({jobs}) {

	//Modal
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const [selectedJob, selectJob] = React.useState({})

	//Pagination
	const numJobs = jobs.length;
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const displayedJobs = jobs.slice(activeStep*50, (activeStep*50)+50);
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<div className="jobs">
			<JobModal open={open} job={selectedJob} handleClose={handleClose}/>
			<Typography variant="h4" component="h4">
				Entry Level Software Jobs
			</Typography>
			<div>
				Total of {numJobs} jobs
			</div>
			{
				displayedJobs.map(
					job => <Job job={job} onClick={() => {
						handleClickOpen();
						selectJob(job)
					}}/>
				)
			}
			<div>
				Page {activeStep+1} of {Math.ceil(numJobs/50)}
			</div>
			<MobileStepper
			  variant="progress"
			  steps={Math.ceil(numJobs/50)}
			  position="static"
			  activeStep={activeStep}
			  className={classes.root}
			  nextButton={
			    <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
			      Next
			     <KeyboardArrowRight />
			    </Button>
			  }
			  backButton={
			    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
			      <KeyboardArrowLeft />
			      Back
			    </Button>
			  }
			/>
		</div>
	)
}