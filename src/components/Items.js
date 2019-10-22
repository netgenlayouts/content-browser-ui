import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ItemsTable from './ItemsTable';
import Breadcrumbs from './Breadcrumbs';
import TableSettings from './TableSettings';
import Preview from './Preview';
import Loader from './utils/Loader';
import S from './Items.module.css';

function ItemsContent(props) {
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
        <div className={S.wrapper}>
          <div className={S.header}>
            <Breadcrumbs items={props.items.path} setId={props.setId} />
            <TableSettings />
          </div>
          <ItemsTable {...props} showParentItem={true} previewItem={props.previewItem} />
        </div>
      </CSSTransition>
    );
  }
}

function Items(props) {
  return (
    <React.Fragment>
      <div className={S.items}>
        <ItemsContent {...props} />
      </div>
      <Preview previewItem={props.previewItem} isLoading={props.isPreviewLoading} />
    </React.Fragment>
  );

}

export default Items;
