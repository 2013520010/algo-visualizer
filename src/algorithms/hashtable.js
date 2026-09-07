/**
 * 哈希表（除留余数法 + 链地址法解决冲突）
 */

/** 哈希函数：除留余数法 */
export function hash(key, size) {
  return ((key % size) + size) % size
}

/** 向哈希表插入一个 key，返回插入信息 */
export function insertIntoTable(buckets, key, size) {
  const index = hash(key, size)
  const isCollision = buckets[index].length > 0
  buckets[index].push(key)
  return { index, isCollision, key, buckets: buckets.map((b) => [...b]) }
}

/** 创建空的桶数组 */
export function createBuckets(size) {
  return Array.from({ length: size }, () => [])
}
