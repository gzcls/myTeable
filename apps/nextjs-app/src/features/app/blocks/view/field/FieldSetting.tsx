import { fieldVoSchema } from '@teable/core';
import { useField } from '@teable/sdk';
import {
  FieldSetting as FieldSettingInner,
  FieldOperator,
} from '@/features/app/components/field-setting';
import { useFieldSettingStore } from './useFieldSettingStore';

export const FieldSetting = () => {
  const { setting, closeSetting } = useFieldSettingStore();
  const field = useField(setting?.fieldId);
  const order = setting?.order;

  const onCancel = () => {
    closeSetting();
  };

  const onConfirm = () => {
    closeSetting();
  };

  const visible = Boolean(setting);
  if (!visible) {
    return <></>;
  }

  const fieldVo = fieldVoSchema.safeParse(field);
  if (!fieldVo.success) {
    console.log('errorField:', field);
    console.error(fieldVo.error);
  }

  return (
    <FieldSettingInner
      visible={visible}
      field={fieldVo.success ? fieldVo.data : undefined}
      order={order}
      operator={setting?.operator || FieldOperator.Add}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};
