import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { ExportToCsv } from "export-to-csv";
import "./Grid.css";

const Grid = () => {
  const baseURL = "http://localhost:8000/getScores";
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchMyAPI() {
        let response = await axios.get(baseURL);
        setStatistics(response.data);
      }
      fetchMyAPI();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  let currentDate = new Date();

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    title: "Psh Exam Stats",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };

  const formatedData = statistics?.map((st) => ({
    id: st.id,
    playerId: st.playerId,
    nickname: st.player.nickname,
    creationDate: st.createdAt,
    score: st.score,
  }));

  const csvExporter = new ExportToCsv(csvOptions);

  return (
    <>
      {statistics ? (
        <Container>
          <Row className="rowMargin">
            <Col>
              <span className="update">
                Actualizado última vez:{" "}
                {`${
                  currentDate.toLocaleDateString() +
                  " - " +
                  currentDate.toLocaleTimeString()
                }`}
              </span>
            </Col>
            <Col className="download-text">
              <Button
                variant="success"
                onClick={() => csvExporter.generateCsv(formatedData)}
              >
                Descargar Estadísticas
              </Button>
            </Col>
          </Row>
          <Row>
            <Table striped bordered hover className="table-container">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Player ID</th>
                  <th>Nickname</th>
                  <th>Profile Pic</th>
                  <th>Creation Date</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {statistics.map((st, index) => (
                  <tr key={st.id}>
                    <td>{index + 1}</td>
                    <td>{st.id}</td>
                    <td>{st.playerId}</td>
                    <td>{st.player.nickname}</td>
                    <td>
                      <img src={st.player.picture} alt="/"></img>
                    </td>
                    <td>{st.createdAt}</td>
                    <td>{st.score}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Container>
      ) : (
        <span className="loading">Cargando datos, aguarde unos segundos</span>
      )}
    </>
  );
};

export default Grid;
