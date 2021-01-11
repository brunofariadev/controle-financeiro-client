export class Pagina {
    constructor(
        public pages?: number[],
        public endIndex?: number,
        public startIndex?: number,
        public endPage?: number,
        public startPage?: number,
        public totalPages?: number,
        public pageSize?: number,
        public currentPage?: number,
        public totalItems?: number
    ) {

    }
}
