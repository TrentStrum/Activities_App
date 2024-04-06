import { Button, Card, Image } from 'semantic-ui-react';
import { useActivityContext } from '../../../app/stores/ActivityContext';
import LoadingComponent from '../../../app/layout/LoadingComponent';


export default function ActivityDetails() {
	const { selectedActivity: activity, openForm, cancelSelectedActivity } =
		useActivityContext();

	if (!activity) return <LoadingComponent content='Activity loading...'/>;

	return (
		<>
			<Card fluid>
				<Image
					src={`../../../../public/assests/categoryImages/${activity.category}.jpg`}
					alt=''
				/>
				<Card.Content>
					<Card.Header>{activity.title}</Card.Header>
					<Card.Meta>
						<span>{activity.date}</span>
					</Card.Meta>
					<Card.Description>{activity.description}</Card.Description>
				</Card.Content>
				<Card.Content>
					<Button.Group widths='2'>
						<Button
							basic
							color='blue'
							content='edit'
							onClick={() => openForm(activity.id)}
						/>
						<Button
							basic
							color='grey'
							content='cancel'
							onClick={cancelSelectedActivity}
						/>
					</Button.Group>
				</Card.Content>
			</Card>
		</>
	);
}
