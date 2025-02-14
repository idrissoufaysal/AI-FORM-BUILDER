"use client"
import { useFormStore } from '@/store/formStore';
import FormCard from './FormCard';

export const FormList: React.FC = () => {
  const forms = useFormStore((state) => state.forms);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Mes Formulaires</h2>
      {forms.length === 0 ? (
        <p className="text-slate-500">Aucun formulaire créé pour le moment.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <FormCard form={form} key={form.id}  />
          )

          )}
        </div>
      )}


    </div>
  );
};