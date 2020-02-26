export const MemberLevelConverter = (level) =>{
    switch (level) {
        case 0:
            return "Normal Member";
        case 1:
            return "Silver Member";
        case 2:
            return "Gold Member";
        case 3:
            return "Diamond Member";
        default:
            return "Normal Member";
    }
};
