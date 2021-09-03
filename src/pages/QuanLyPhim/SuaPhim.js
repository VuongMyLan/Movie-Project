import React from 'react';
import AdminTemplate from '../../components/Templates/AdminTemplate/AdminTemplate';
import ChangeForm from '../../components/Form/ChangeForm';

const SuaPhim = (props) => {
    const id = props.match.params.id;
    console.log('id', id);

    return (
        <div>
            <AdminTemplate>
                <>
                    <div className=' row changeFilm-container justify-content-center'>
                        <h1>Change Info Movie </h1>
                    </div>

                    <div className='row admin-change-film-form'>
                        <div className=' col-12'>
                            <ChangeForm isEdit={true} id={id} />
                        </div>
                    </div>
                </>
            </AdminTemplate>
        </div>
    );
};

export default SuaPhim;
