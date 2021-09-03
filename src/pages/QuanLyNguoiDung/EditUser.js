import React from 'react';
import AdminTemplate from '../../components/Templates/AdminTemplate/AdminTemplate';
import UserForm from '../../components/Form/UserForm';

const EditUSer = () => {
    return (
        <div>
            <AdminTemplate>
                <>
                    <div className=' row changeFilm-container justify-content-center'>
                        <h1>Edit User </h1>
                    </div>

                    <div className='row admin-change-film-form'>
                        <div className=' col-12'>
                            <UserForm isEdit={true} />
                        </div>
                    </div>
                </>
            </AdminTemplate>
        </div>
    );
};

export default EditUSer;
