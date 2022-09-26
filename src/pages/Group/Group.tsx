import React         from 'react';
import { useParams } from "react-router-dom";

function Group() {

  let params = useParams()

  return (
    <div>Group | {params.groupId}</div>
  );
}

export default Group;
