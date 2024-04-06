import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { SyntheticEvent, useState } from 'react';
import { useActivityContext } from '../../../app/stores/ActivityContext';
import { Link } from 'react-router-dom';

export default function ActivityList() {

	const { activities, deleteActivity, isSubmitting } =
		useActivityContext();
	const [ target, setTarget ] = useState('');


	function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
		setTarget(e.currentTarget.name);
		deleteActivity(id);
	}

	return (
		<>
			<Segment>
				<Item.Group divided>
					{activities.map((activity: Activity) => (
						<Item key={activity.id}>
							<Item.Content>
								<Item.Header as='a'>
									{activity.title}
								</Item.Header>
								<Item.Meta>{activity.date}</Item.Meta>
								<Item.Description>
									<div>{activity.description}</div>
									<div>
										{activity.city}, {activity.venue}
									</div>
								</Item.Description>
								<Item.Extra>
									<Button
										as={Link}
										to={`/activities/${activity.id}`}
										floated='right'
										content='View'
										color='blue'
									/>
									<Button
										className={activity.id}
										loading={
											isSubmitting &&
											target === activity.id
										}
										floated='right'
										content='Delete'
										color='red'
										onClick={(e) =>
											handleActivityDelete(e, activity.id)
										}
									/>
									<Label
										basic
										content={activity.category}
									/>
								</Item.Extra>
							</Item.Content>
						</Item>
					))}
				</Item.Group>
			</Segment>
		</>
	);
}
