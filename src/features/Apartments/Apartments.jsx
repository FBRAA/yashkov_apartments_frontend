import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getServerApartments } from '../../slices/apartmentsSlice';
import Loader from '../../components/Loader'
import SearchForm from './SearchForm';
import TopBar from '../../components/TopBar';
import SortSelect from './SortSelect';
import ApsList from './ApsList';
import NoApsWarning from './NoApsWarning';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  background-color: white;
`

const ApsHeaderBar = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  width: 80%;
  @media (max-width: 815px) {
    justify-content: center;
    width: 90%;
  }
`

const ApsListHeader = styled.div`
  font-size: 2rem;
  margin: 0 2rem 0 2rem;
  @media (max-width: 815px) {
    display: none;
  }
`

const Apartments = () => {
  const dispatch = useDispatch()

  const isLoading = useSelector((store) => store.apartments.isLoading)
  const apartmentsData = useSelector((store) => store.apartments.apartmentsData)
  const qtyOfAps = useSelector((store) => store.apartments.qtyOfAps)

  const [queryParams, setQueryParams] = useState({});
  const [sortParam, setSortParam] = useState(0);
  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 6,
  });

  const onChange = (pg, ps) => {
    setPageState((prevPageState) => {
      if (prevPageState.pageSize !== ps) {
        return {
          page: 1,
          pageSize: ps,
        }
      }

      return {
        page: pg,
        pageSize: prevPageState.pageSize,
      }
    })
  }

  const onSelectChange = (value) => {
    setSortParam(value)
  }
  // В данном случае useEffect(), расположенный в верхней части иерархии
  // приложения не создаёт оснований для множественных ререндеров листа
  // квартир и всей страницы, так как сбор информации с формы производится
  // только по кнопке поиска.
  useEffect(() => {
    if (queryParams) {
      dispatch(getServerApartments({
        rooms: queryParams.rooms,
        floorMin: queryParams.floorMin,
        floorMax: queryParams.floorMax,
        priceMin: queryParams.priceMin,
        priceMax: queryParams.priceMax,
        area_totalMin: queryParams.area_totalMin,
        area_totalMax: queryParams.area_totalMax,
        sortType: sortParam,
        page: pageState.page,
        pageSize: pageState.pageSize,
      }))
    } else {
      dispatch(getServerApartments({
        page: pageState.page,
        pageSize: pageState.pageSize,
      }))
    }
  }, [queryParams, sortParam, pageState])

  return (
    <PageWrapper>
      <TopBar>
        <SearchForm
          setQueryParams={setQueryParams}
          setPageState={setPageState}
        />
      </TopBar>

      {apartmentsData.length !== 0
      && (
        <ApsHeaderBar>
          <ApsListHeader> Квартиры </ApsListHeader>
          <div>Сортировать: </div>
          <SortSelect onSelectChange={onSelectChange} />
        </ApsHeaderBar>
      )}

      { isLoading && <Loader />}

      {apartmentsData.length === 0 && (
        <NoApsWarning />
      )}

      {apartmentsData && apartmentsData.map((apt) => (
        <ApsList apt={apt} key={apt.id} />
      ))}

      {apartmentsData.length !== 0
      && (
      <Pagination
        showSizeChanger
        onChange={onChange}
        pageSizeOptions={[2, 4, 6]}
        defaultPageSize={6}
        defaultCurrent={1}
        current={pageState.page}
        total={qtyOfAps}
        style={{ marginTop: 'auto', margin: '1rem 0 1rem 0' }}
      />
      )}
    </PageWrapper>
  )
}

export default Apartments
