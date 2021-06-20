import React, { Fragment } from "react";
import { useHistory } from "react-router";
import { Topbar } from "../../components/Topbar";
import { getStatusById } from "../../constants/TaskStatus";
import { TaskCollaborators, TaskDescription, TaskFooter, TaskDueDate, TaskResponsable, TaskStatusLabel, TaskTitle } from "./styles";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { HTTP_VERBS, requestHttp } from '../../utils/HttpRequest';
import { TASKS } from "../../constants/HttpEndpoints";
import { getToken } from "../../utils/LocalStorageToken";
import { CollaboratorItem } from "./components/CollaboratorItem";
import { Label } from "../../components/Input/styles";
import { FormGroup } from "../../globalStyles";

const TaskDetail = ({title}) => {
  const history = useHistory();
  const { id } = useParams();
  const [taskDetail, setTaskDetail] = useState({
    title: "",
    description: "",
    due_date: "",
    responsible: {},
    collaborators: [],
  });

  useEffect(() => {
    const taskDetail = fetchTaskDetail({id: id});
    // eslint-disable-next-line
  }, []);

  const fetchTaskDetail = async (data) => {
    try{
      const token = getToken();
      const endpoint = buildEndpoint(data);
      const request = await requestHttp({
        method: HTTP_VERBS.GET,
        token,
        endpoint: endpoint,
      });

      console.log(request.data)
      setTaskDetail(request.data);
    } catch (error) {
      console.log("error");
    }

  };

  const buildEndpoint = (data) => {
    return `${TASKS.getTaskDetail}/${data.id}`
  };

  const renderStatus = (id) => {
    const status = getStatusById(id);
    return <TaskStatusLabel color={status.color}>{status.name}</TaskStatusLabel>
  }

  const goBackApp = () => {
    history.goBack();
  }

  return (
    <Fragment>
      <Topbar isBackVisible={true} onPress={goBackApp} title={title} />
      { renderStatus(2) }
      <TaskTitle>{taskDetail.title}</TaskTitle>
      <TaskDescription>{taskDetail.description}</TaskDescription>
      <TaskFooter>
        <FormGroup>
          <label>
          Fecha de vencimiento
          </label>
          <TaskDueDate>{taskDetail.due_date}</TaskDueDate>
        </FormGroup>
        <FormGroup>
          <label>
          Responsable
          </label>
          <TaskResponsable>{taskDetail.responsible.name}</TaskResponsable>
        </FormGroup>
        <FormGroup>
        <label>Colaboradores</label>
        <TaskCollaborators>
          {
            
            taskDetail.collaborators.map(({name}, key) => (
              <CollaboratorItem key={key} text={name}/>
            ))
          }
        </TaskCollaborators>
        </FormGroup>
      </TaskFooter>
    </Fragment>
  );
};

export default TaskDetail;
