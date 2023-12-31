import React, {
  FC,
  ReactElement,
  useEffect,
  useState,
  useContext,
} from 'react';
import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  Alert,
  Button,
  AlertTitle,
} from '@mui/material';
import { TaskStatusChangedContext } from '../../context';
import { useMutation } from 'react-query';
import { TaskTitleField } from './_taskTitleField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './_taskSelectField';
import { Status } from './enums/status';
import { Priority } from './enums/priority';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskarea/interfaces/ICreateTask';
export const CreateTaskForm: FC = (): ReactElement => {
  // declare component state
  // setting states for each field
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStauts] = useState<string>(Status.todo);
  const [priority, setPriority] = useState<string>(Priority.normal);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const taskUpdatedContext = useContext(TaskStatusChangedContext);
  // Create task mutation
  const createTaskMutation = useMutation((data: ICreateTask) =>
    sendApiRequest('http://localhost:3200/tasks', 'POST', data),
  );
  function createTaskHandler() {
    if (!title || !date || !description) {
      return;
    }
    const task: ICreateTask = {
      title,
      description,
      date: date.toString(),
      status,
      priority,
    };
    createTaskMutation.mutate(task);
  }
  /**
   * Manage side Effect inside the eapplication
   */
  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccess(true);
      taskUpdatedContext.toggle();
    }
    const successTimeOut = setTimeout(() => {
      setShowSuccess(false);
    }, 7000);
    return () => {
      clearTimeout(successTimeOut);
    };
  }, [createTaskMutation.isSuccess]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      {showSuccess && (
        <Alert severity="success" sx={{ width: '100%', marginBottom: '16px' }}>
          <AlertTitle>Success</AlertTitle>
          The task has been created successfully
        </Alert>
      )}

      <Typography mb={2} component="h2" variant="h6">
        Create A Task
      </Typography>

      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField
          onChange={(e) => setTitle(e.target.value)}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDescriptionField
          onChange={(e) => setDescription(e.target.value)}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDateField
          value={date}
          onChange={(date) => setDate(date)}
          disabled={createTaskMutation.isLoading}
        />
        <Stack direction="row" spacing={2}>
          <TaskSelectField
            label="Status"
            name="status"
            value={status}
            disabled={createTaskMutation.isLoading}
            onChange={(e) => setStauts(e.target.value as string)}
            items={[
              {
                value: Status.todo,
                label: Status.todo.toUpperCase(),
              },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
              {
                value: Status.completed,
                label: Status.completed.toUpperCase(),
              },
            ]}
          />
          <TaskSelectField
            label="Priority"
            name="priority"
            value={priority}
            disabled={createTaskMutation.isLoading}
            onChange={(e) => setPriority(e.target.value as string)}
            items={[
              {
                value: Priority.low,
                label: Priority.low,
              },
              {
                value: Priority.normal,
                label: Priority.normal,
              },
              {
                value: Priority.high,
                label: Priority.high,
              },
            ]}
          />
        </Stack>
        {createTaskMutation.isLoading && <LinearProgress />}

        <Button
          onClick={createTaskHandler}
          variant="contained"
          size="large"
          fullWidth
          disabled={!title || !description || !date || !status || !priority}
        >
          Create A Task
        </Button>
      </Stack>
    </Box>
  );
};
