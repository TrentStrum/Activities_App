import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from 'react';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';
import { Activity } from '../models/activity';

type ActivityContextProps = {
	children: ReactNode;
};

type ActivityContextType = {
	activities: Activity[];
	setActivities: Dispatch<SetStateAction<Activity[]>>;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	selectedActivity?: Activity;
	setSelectedActivity: Dispatch<SetStateAction<Activity | undefined>>;
	editMode: boolean;
	setEditMode: Dispatch<SetStateAction<boolean>>;
	isSubmitting: boolean;
	setIsSubmitting: Dispatch<SetStateAction<boolean>>;
	selectActivity(id: string): void;
	openForm: (id?: string) => void;
	closeForm(): void;
	createOrEditActivity(activity: Activity): void;
	deleteActivity(id: string): void;
	cancelSelectedActivity(): void;
};

export const ActivityContext = createContext<ActivityContextType | null>(null);

export function useActivityContext() {
	const context = useContext(ActivityContext);
	if (!context) {
		throw new Error('Critical error: activity context failed');
	}
	return context;
}

export default function ActivityContextProvider({
	children,
}: ActivityContextProps) {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedActivity, setSelectedActivity] = useState<
		Activity | undefined
	>(undefined);
	const [editMode, setEditMode] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		agent.Activities.list().then((response) => {
			const activities: Activity[] = [];
			response.forEach((activity) => {
				activity.date = activity.date.split('T')[0];
				activities.push(activity);
			});
			setActivities(activities);
			setIsLoading(false);
		});
	}, []);


	function selectActivity(id: string) {
		setSelectedActivity(activities.find((x) => x.id === id));
	}

	function cancelSelectedActivity() {
		setSelectedActivity(undefined);
	}

	function openForm(id?: string) {
		id ? selectActivity(id) : cancelSelectedActivity();
		setEditMode(true);
	}

	function closeForm() {
		setEditMode(false);
	}

	function createOrEditActivity(activity: Activity) {
		setIsSubmitting(true);
		if (activity.id) {
			agent.Activities.update(activity).then(() => {
				setActivities([
					...activities.filter((x) => x.id !== activity.id),
					activity,
				]);
				setSelectedActivity(activity);
				setEditMode(false);
				setIsSubmitting(false);
			});
		} else {
			activity.id = uuid();
			agent.Activities.create(activity).then(() => {
				setActivities([...activities, activity]);
				setSelectedActivity(activity);
				setEditMode(false);
				setIsSubmitting(false);
			});
		}
	}

	function deleteActivity(id: string) {
		setIsSubmitting(true);
		agent.Activities.delete(id).then(() => {
			setActivities([...activities.filter((x) => x.id !== id)]);
		});
		setIsSubmitting(false);
	}

	return (
		<ActivityContext.Provider
			value={{
				activities,
				setActivities,
				isLoading,
				setIsLoading,
				selectedActivity,
				setSelectedActivity,
				selectActivity,
				editMode,
				setEditMode,
				isSubmitting,
				setIsSubmitting,
				openForm,
				closeForm,
				createOrEditActivity,
				deleteActivity,
				cancelSelectedActivity,
			}}
		>
			{children}
		</ActivityContext.Provider>
	);
}
