import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ItemsTable from './ItemsTable';
import Breadcrumbs from './Breadcrumbs';
import Dropdown from './utils/Dropdown';
import Checkbox from './utils/Checkbox';
import Loader from './utils/Loader';
import SettingsIcon from '@material-ui/icons/Settings';
import S from './Items.module.css';

function Items(props) {
  if (!props.items) {
    return '';
  } else if (props.isLoading) {
    return <Loader />;
  } else {
    return (
      <CSSTransition
        in
        appear
        timeout={200}
        classNames={{
          appear: S.fadeEnter,
          appearActive: S.fadeActiveEnter,
          appearDone: S.fadeActiveDone,
          enterDone: S.fadeEnterDone,
          exit: S.fadeExit,
          exitActive: S.fadeActiveExit,
        }}
      >
        <div>
          <div className={S.header}>
            <Breadcrumbs items={props.items.path} setLocationId={props.setLocationId} />
            <Dropdown label="Table options" icon={<SettingsIcon fontSize="small" color="inherit" />}>
              {props.availableColumns.map(column => {
                if (column.id === 'name') return false;
                return (
                  <li key={column.id}>
                    <Checkbox
                      name="set-table-option"
                      id={`set-${column.id}`}
                      label={column.name}
                      onChange={(e) => props.toggleColumn(column.id, e.target.checked)}
                      checked={props.activeColumns.includes(column.id)}
                    />
                  </li>
                );
              })}
            </Dropdown>
          </div>
          <ItemsTable {...props} />
        </div>
      </CSSTransition>
    );
  }
}

export default Items;
