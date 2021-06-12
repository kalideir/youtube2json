import React, { useState, useMemo, useRef } from "react";
import { List, Input, Button, Checkbox } from "antd";
import {
  CheckSquareOutlined,
  YoutubeOutlined,
  DownloadOutlined,
  FileTextOutlined,
  FieldTimeOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { CSVLink } from "react-csv";
import * as TYPES from "../store/types";
import VideoTranscriptModal from "./VideoTranscriptModal";
import ViewVideoModal from "./ViewVideoModal";

const VideosList = () => {
  const dispatch = useDispatch();
  const [criteria, setCriteria] = useState("");
  const [started, setStarted] = useState(false);
  const [transcriptModalVisible, setTranscriptModalVisible] = useState(false);
  const [ViewModalVisible, setViewModalVisible] = useState(false);
  const [data, setData] = useState<any>({channel: {}, videos: []});
  const ws = useRef<WebSocket>();
  const { videos, selectedVs, currentSession, withText } =
    useSelector((state: RootStateOrAny) => state.sessions);

  const setSelectedVideos = (v: string) => {
    if (!selectedVs.includes(v)) {
      const items = [...selectedVs, v];
      dispatch({
        type: TYPES.SET_SELECTED_VIDEOS,
        payload: { selectedVs: items },
      });
    } else {
      const items = [...selectedVs].filter((vidId: string) => vidId !== v);
      dispatch({
        type: TYPES.SET_SELECTED_VIDEOS,
        payload: { selectedVs: items },
      });
    }
  };

  const viewTranscript = async (v: string) => {
    await dispatch({ type: TYPES.SET_CURRENT_VIDEO, payload: v });
    setTranscriptModalVisible(true);
  };

  const viewVideo = (v: string) => {
    dispatch({ type: TYPES.SET_CURRENT_VIDEO, payload: v });
    setViewModalVisible(true);
  };

  const setLong = () => {
    const items: any[] = [];
    videos.forEach((vid: any) => {
      if (vid.duration > "20:00") {
        items.push(vid.v);
      }
    });
    dispatch({
      type: TYPES.SET_SELECTED_VIDEOS,
      payload: { selectedVs: items },
    });
  };

  const setAll = () => {
    const items: any[] = [];
    videos.map((vid: any) => {
      items.push(vid.v);
      return vid;
    });
    dispatch({
      type: TYPES.SET_SELECTED_VIDEOS,
      payload: { selectedVs: items },
    });
  };

  const fetchTranscripts = async () => {
    ws.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/session/transcripts/`
    );
    ws.current.onopen = async () => {
      console.log("connected");
      setStarted(true);
      if (ws.current) {
        selectedVs.forEach((v: string, index: number) => {
          const ev: string = JSON.stringify({ v });
          ws.current?.send(ev);
        });
      }
    };

    ws.current.onmessage = (evt: any) => {
      const data = JSON.parse(evt.data);
      dispatch({
        type: TYPES.UPDATE_VIDEO_CONTENT,
        payload: {
          ...data,
        },
      });
    };
  };

  useMemo(() => {
    if (withText.length === selectedVs.length) {
      const res : any= {};
      const vids : any[] = [];
      res.channel = currentSession;
      videos.forEach((video: any) => {
        if (withText.includes(video.v)) {
          vids.push(video);
        }
      });
      console.log(res);
      res.videos = vids;
      setData(res);
    }
  }, [withText]);

  const Header = () => {
    return (
      <div className="vl-header">
        <div className="search">
          <Input className="input" placeholder="Basic usage" />
        </div>
        <div className="actions">
          <Button
            type="primary"
            shape="round"
            disabled={started}
            onClick={
              !started
                ? () => {
                    setCriteria("long");
                    setLong();
                  }
                : () => {}
            }
            className={criteria === "long" ? "action1" : "action2"}
            icon={<CheckSquareOutlined />}
          >
            Select Long
          </Button>
          <Button
            disabled={started}
            type="primary"
            shape="round"
            onClick={
              !started
                ? () => {
                    setCriteria("all");
                    setAll();
                  }
                : () => {}
            }
            className={criteria === "all" ? "action1" : "action2"}
            icon={<CheckSquareOutlined />}
          >
            Select All
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <List
        bordered
        header={<Header />}
        dataSource={videos}
        className="list"
        renderItem={(item: any, index: number) => (
          <List.Item key={index}>
            <div className="item-content">
              <Checkbox
                disabled={started}
                className={`checkbox ${started ? "disabled" : ""}`}
                onChange={() => {
                  setCriteria("");
                  setSelectedVideos(item.v);
                }}
                checked={!!selectedVs.includes(item.v)}
              />
              <h3>{item.title}</h3>
            </div>
            <div className="video-actions">
              <Button type="text" icon={<FieldTimeOutlined />}>
                {item.duration}
              </Button>
              <Button
                type="text"
                onClick={() => viewVideo(item.v)}
                icon={<YoutubeOutlined />}
              >
                view
              </Button>
              <Button
                type="text"
                onClick={() => viewTranscript(item.v)}
                className={withText.includes(item.v) ? "processed" : ""}
                icon={<FileTextOutlined />}
              >
                transcript
              </Button>
            </div>
          </List.Item>
        )}
      />
      <div className="footer-btns">
        {withText.length === selectedVs.length ? (
          <Button
            icon={<DownloadOutlined />}
            type="primary"
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(data)
            )}`}
            download={`${currentSession.sessionName}.json`}
          >
            Download Json
          </Button>
        ) : (
          <Button
            type="primary"
            disabled={started}
            className={`btn-extract ${started ? "disabled" : ""}`}
            onClick={() => fetchTranscripts()}
            icon={<FileSearchOutlined />}
          >
            Extract Transcripts
          </Button>
        )}
      </div>
      <VideoTranscriptModal
        visible={transcriptModalVisible}
        setVisible={setTranscriptModalVisible}
      />
      <ViewVideoModal
        visible={ViewModalVisible}
        setVisible={setViewModalVisible}
      />
    </div>
  );
};

export default VideosList;
