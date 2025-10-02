import React from "react";
import { connect } from "react-redux";
import type { RootState } from "../../store"; // adjust path
import type { Alert as AlertType } from "../../reducers/alert"; // your alert interface

interface Props {
  alerts: AlertType[];
}

const Alert: React.FC<Props> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <>
      {alerts.map((alert) => (
        <div className={`${alert.alertType} alert`} key={alert.id}>
          {alert.msg}
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
