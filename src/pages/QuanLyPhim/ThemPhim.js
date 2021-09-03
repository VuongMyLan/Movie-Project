import React from 'react';
import AdminTemplate from '../../components/Templates/AdminTemplate/AdminTemplate';
import ChangeForm from '../../components/Form/ChangeForm';

export default function ThemPhim(props) {
    return (
        <div>
            <AdminTemplate>
                <>
                    <div className=' row changeFilm-container justify-content-center'>
                        <h1>Add movie </h1>
                    </div>

                    <div className='row admin-change-film-form'>
                        <div className=' col-12'>
                            {/* <ChangeForm isEdit={false} /> */}
                        </div>
                    </div>
                </>
            </AdminTemplate>
        </div>
    );
}
