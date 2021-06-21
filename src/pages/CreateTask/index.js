import { Fragment } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Topbar } from "../../components/Topbar";
import Select from "react-select";
import DatePicker from "react-date-picker";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "./styles";
import { FormGroup, LabelError } from "../../globalStyles";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCollaborators } from "../../store";

import { HTTP_VERBS, requestHttp } from '../../utils/HttpRequest';
import { getToken } from "../../utils/LocalStorageToken";
import { TASKS } from "../../constants/HttpEndpoints";

import { useHistory } from "react-router";

const CreateTask = ({ title, collaboratorsData, fetchCollaboratorsAction }) => {
  
  const history = useHistory();
  const requestError = false;

  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors,
      isValid
    }
  } = useForm({ mode: 'onChange' });

  const onSubmitCreate = (data) => {
    data.responsible = data.responsible.value;
    data.collaborators = data.collaborators.map(({value}) => {return value});
    try{
      requestCreateTask(data);
      history.push("/");
    } catch (error) {

    };
  };

  const requestCreateTask = async (data) => {
    try {
      const token = getToken();
      const request = await requestHttp({
        method: HTTP_VERBS.POST,
        token,
        data: data,
        endpoint: TASKS.createTask,
      });
      
      return request;
    } catch (error) {
      console.log("Error");
    };
  };

  const getCollaborators = () => {
    return collaboratorsData.collaborators.map(({id, name}) => {return {value: id, label : name}})
  };


  useEffect(() => {
    fetchCollaboratorsAction();
    // eslint-disable-next-line
  }, []);

  const collaborators = getCollaborators();

  return (
    <Fragment>
      <Topbar title={title} />
      <form onSubmit={handleSubmit(onSubmitCreate)}>
        <FormGroup>
          <label>Task title</label>
          <Input 
            register={register} 
            name="taskTitle" 
            rules={{ required: true, minLength: 6 }}
            label="Task title" 
            type="text" 
            placeholder="Enter task title" 
          />
          { errors.taskTitle?.type === 'required' && <LabelError>Field required</LabelError> }
          { errors.taskTitle?.type === 'minLength' && <LabelError>Min Length 6 characters</LabelError> }
        </FormGroup>

        <FormGroup>
          <label>Responsible</label>
          <Controller
            name="responsible"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select responsible"
                options={collaborators}
              />
            )}
          />
          { errors.responsible && <LabelError>Field required</LabelError> }
        </FormGroup>

        <FormGroup>
          <label>Collaborators</label>
          <Controller
            name="collaborators"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                placeholder="Select collaborators"
                options={collaborators}
              />
            )}
          />
          { errors.collaborators && <LabelError>Field required</LabelError> }
        </FormGroup>
        <FormGroup>
          <label>Due Date</label>
          <div>
            <Controller
              name="dueDateTask"
              control={control}
              defaultValue={new Date()}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker {...field} locale="en-EN" format="dd-MM-yy" />
              )}
            />
          </div>
          { errors.dueDateTask && <LabelError>Field required</LabelError> }
        </FormGroup>

        <FormGroup>
          <label>Description</label>
          <div>
            <Textarea 
              {...register("description", { required: true } )} 
              rows="3"
              errors={ errors.description }
            />
          </div>
          { errors.description && <LabelError>Field required</LabelError> }
        </FormGroup>
        <div>
          <Button disabled={!isValid} type="submit" text="Create" />
        </div>
      </form>
      <div>
        { requestError && "Ha ocurrido un error"}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    collaboratorsData: state.collaborators
  }
}

const mapDispacthToProps = dispatch => {
  return {
    fetchCollaboratorsAction: (filter) => dispatch(fetchCollaborators(filter))
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(CreateTask);

