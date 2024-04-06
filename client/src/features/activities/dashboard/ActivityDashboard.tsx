import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useActivityContext } from '../../../app/stores/ActivityContext';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function ActivityDashboard() {
	const { selectedActivity, editMode } = useActivityContext();
	const { isLoading } = useActivityContext();

	if (isLoading) return <LoadingComponent content='Loading app' />;

	return (
		<>
			<Grid>
				<Grid.Column width='10'>
					<ActivityList />
				</Grid.Column>
				<Grid.Column width='6'>
					{selectedActivity && !editMode && (
						<ActivityDetails />
					)}
					{editMode && <ActivityForm />}
				</Grid.Column>
			</Grid>
		</>
	);
}
